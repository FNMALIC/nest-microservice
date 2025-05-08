import { Injectable } from '@nestjs/common';
import { Requests } from '../../../../models/requests';
import { InjectModel } from '@nestjs/sequelize';
import { RequestCategories } from '../../../../models/request-catetgories';
import { Employees } from '../../../../models/employees';
import { RequestStepBatches } from '../../../../models/request-step-batchs';
import { RequestBatches } from '../../../../models/request-batchs';
import * as _ from 'lodash';
import { Op } from 'sequelize';
import { RequestSteps } from '../../../../models/request-steps';
import fs from 'fs';
import { encode } from 'url-encode-decode';
import { AcademicYears } from '../../../../models/academic-years';
import { callbackFolder, serializer } from '../../../../helpers/func';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(Requests) private requestModel: typeof Requests,
    @InjectModel(RequestCategories)
    private requestCategoriesModel: typeof RequestCategories,
    @InjectModel(Employees) private employeesModel: typeof Employees,
    @InjectModel(RequestStepBatches)
    private requestStepBatchesModel: typeof RequestStepBatches,
    @InjectModel(RequestBatches)
    private requestBatchesModel: typeof RequestBatches,
    @InjectModel(RequestSteps)
    private requestStepsModel: typeof RequestSteps,
    @InjectModel(AcademicYears)
    private academicYearsModel: typeof AcademicYears,
  ) {
  }

  async getOne(params) {
    try {
      const RequestCategory = await this.requestCategoriesModel;
      const Employee = await this.employeesModel;

      const result = await this.requestModel.findAll({
        include: [
          {
            model: RequestCategory,
            as: 'RequestCategory',
            attributes: ['S_CATEGORIE', 'ID_SCAT', 'ID_CAT'],
          },
          {
            model: Employee,
            as: 'Employee',
            attributes: ['LASTNAME', 'FIRSTNAME', 'EMPLOYEE_ID'],
          },
        ],
        where: { YEAR_ID: params.year || process.env.YEAR },
      });

      if (result) return result;
      else return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getRequestConcerned(params) {
    try {
      const RequestCategory = this.requestCategoriesModel;
      const Employee = this.employeesModel;
      const RequestStepBatch = this.requestStepBatchesModel;
      const AcademicYear = this.academicYearsModel;
      const RequestBatch = this.requestBatchesModel;

      let YEAR = serializer(await AcademicYear.findOne({
        where: {
          [Op.or]: [
            { YEAR_NAME: params.years || process.env.YEAR },
            { YEAR_ID: params.years || process.env.YEAR },
          ],
        },
      }));

      const reqAttr = [
        'CLASS_ID',
        'DESCRIPTION',
        'PRINTED',
        'REQUEST_ID',
        'REQUEST_OBJECT',
        'REQUEST_PBLM_DATE',
        'REQUEST_PBLM_HOUR_END',
        'REQUEST_PBLM_HOUR_START',
        'REQUEST_STATUS',
        'REQUEST_UNITY_TRANSMISSIBLE',
        'SUBJECT_ID',
        'createdAt',
        'id',
        'REQUEST_UNITY_ID',
      ];
      const reqCatAttr = ['ID_SCAT', 'id', 'S_CATEGORIE', 'ID_CAT'];
      const empAttr = ['id', 'EMPLOYEE_ID', 'LASTNAME', 'FIRSTNAME'];
      let result;
      if (params.user === 'ADM')
        result = await this.requestModel.findAll({
          attributes: reqAttr,
          include: [
            {
              model: RequestCategory,
              as: 'RequestCategory',
              attributes: reqCatAttr,
            },
            {
              model: Employee,
              as: 'Employee',
              attributes: empAttr,
            },
          ],
          where: { YEAR_ID: YEAR.YEAR_ID },
        });
      else if (params.user === 'SENG')
        result = await this.requestModel.findAll({
          attributes: reqAttr,
          include: [
            {
              model: RequestCategory,
              as: 'RequestCategory',
              attributes: reqCatAttr,
            },
            {
              model: Employee,
              as: 'Employee',
              attributes: empAttr,
            },
          ],
          where: {
            REQUEST_UNITY_ID: {
              [Op.like]: params.user === 'ADM' ? '%%' : params.user,
              [Op.not]: 'EMPLOYEE',
            },
            YEAR_ID: YEAR.YEAR_ID,
            REQUEST_STATUS: { [Op.not]: 'REJECTED' },
          },
        });
      else {
        result = await this.requestModel.findAll({
          attributes: reqAttr,
          include: [
            {
              model: RequestCategory,
              as: 'RequestCategory',
              attributes: reqCatAttr,
            },
            {
              model: Employee,
              as: 'Employee',
              attributes: empAttr,
            },
            {
              required: false,
              model: RequestStepBatch,
              as: 'RequestStepBatch',
              where: {
                REQUEST_DEST_ID: params.user,
              },
              include: [
                {
                  model: RequestBatch,
                  as: 'RequestBatch',
                  where: {
                    RBATCH_UNREAD: 0,
                  },
                },
              ],
            },
          ],
          where: {
            REQUEST_UNITY_ID: {
              [Op.like]: params.user === 'ADM' ? '%%' : params.user,
            },
          },
        });

        result = serializer(result);
        result = result?.filter(elt =>
          !!elt.RequestStepBatch ||
          (!elt.RequestStepBatch && elt.RequestCategory.ID_SCAT === '0601'),
        );
        result = _.uniqBy(result || [], 'id');
      }

      //   this.logger.debug('Request received: ' + ctx);

      if (result) return result;
      else return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getRequestConcernedAuthor(params) {
    if (params.matricule) {
      let result: any = await this.requestModel.findAll({
        where: { REQUEST_AUTHOR: params.matricule },
        include: [
          {
            model: this.requestCategoriesModel,
            attributes: ['S_CATEGORIE', 'ID_SCAT', 'ID_CAT'],
          },
          {
            model: this.requestStepsModel,
            attributes: ['RSTEP_COMM', 'RSTEP_STATUS'],
          },
        ],
      });

      const rSteps = serializer(result);
      result = _.uniqBy([...rSteps], 'REQUEST_ID');
      result = result.map((elt, i, arr) => {
        const closedStep = rSteps.find(
          (e) =>
            e.REQUEST_ID === elt.REQUEST_ID &&
            !!e.RequestStep &&
            (e.RequestStep?.RSTEP_STATUS === 'VALIDATED' ||
              e.RequestStep?.RSTEP_STATUS === 'REJECTED'),
        )?.RequestStep;
        const processingStep = arr.find(
          (e) =>
            e.REQUEST_ID === elt.REQUEST_ID &&
            e.RequestStep &&
            e.RequestStep?.RSTEP_STATUS === 'PROCESSING',
        )?.RequestStep;
        return {
          ...elt,
          RequestStep: closedStep ? closedStep : processingStep,
        };
      });
      return result ?? null;
    }
    return null;
  }

  async getById(params) {
    try {
      if (params.matricule) {
        const totalDone = await this.requestModel.count({
          where: { REQUEST_AUTHOR: params.matricule },
        });
        const totalClose = await this.requestModel.count({
          where: {
            REQUEST_AUTHOR: params.matricule,
            REQUEST_STATUS: 'CLOSED',
          },
        });
        const totalProcessing = await this.requestModel.count({
          where: {
            REQUEST_AUTHOR: params.matricule,
            REQUEST_STATUS: 'PROCESSING',
          },
        });
        const totalRejected = await this.requestModel.count({
          where: {
            REQUEST_AUTHOR: params.matricule,
            REQUEST_STATUS: 'REJECTED',
          },
        });
        const totalRegistered = await this.requestModel.count({
          where: {
            REQUEST_AUTHOR: params.matricule,
            REQUEST_STATUS: 'REGISTERED',
          },
        });
        const totalValidated = await this.requestModel.count({
          where: {
            REQUEST_AUTHOR: params.matricule,
            REQUEST_STATUS: 'VALIDATED',
          },
        });

        const result = {
          totalDone,
          totalClose,
          totalProcessing,
          totalRejected,
          totalRegistered,
          totalValidated,
        };

        if (result) return result;
        // else meta.$statusCode = 204;
      } else {
        // ctx.meta.$statusCode = 400;
        return { message: 'missing or incorrect parameters' };
      }
    } catch (e) {
      console.log(e);
      // ctx.meta.$statusCode = 500;
    }
  }

  async getStatRequestForUser(params) {
    try {
      if (params.matricule) {
        const totalDone = await this.requestModel.count({
          where: { REQUEST_AUTHOR: params.matricule },
        });
        const totalClose = await this.requestModel.count({
          where: {
            REQUEST_AUTHOR: params.matricule,
            REQUEST_STATUS: 'CLOSED',
          },
        });
        const totalProcessing = await this.requestModel.count({
          where: {
            REQUEST_AUTHOR: params.matricule,
            REQUEST_STATUS: 'PROCESSING',
          },
        });
        const totalRejected = await this.requestModel.count({
          where: {
            REQUEST_AUTHOR: params.matricule,
            REQUEST_STATUS: 'REJECTED',
          },
        });
        const totalRegistered = await this.requestModel.count({
          where: {
            REQUEST_AUTHOR: params.matricule,
            REQUEST_STATUS: 'REGISTERED',
          },
        });
        const totalValidated = await this.requestModel.count({
          where: {
            REQUEST_AUTHOR: params.matricule,
            REQUEST_STATUS: 'VALIDATED',
          },
        });

        const result = {
          totalDone,
          totalClose,
          totalProcessing,
          totalRejected,
          totalRegistered,
          totalValidated,
        };

        if (result) return result;
      } else {
        return { message: 'missing or incorrect parameters' };
      }
    } catch (e) {
      console.log(e);
    }
  }

  async setPrinted(params) {
    try {
      if (params.id) {
        const result = await this.requestModel.update(
          { PRINTED: true },
          { where: { id: params.id } },
        );
        if (result) return result;
        else {
          return { message: 'An error occurred when set printing' };
        }
      } else {
        return { message: 'Invalid or missing parameters' };
      }
    } catch (e) {
      console.log(e);
    }
  }

  async rejectRequest(params) {
    try {
      if (params.id) {
        const result = await this.requestModel.update(
          { REQUEST_STATUS: 'REJECTED' },
          { where: { id: params.id } },
        );
        if (result) return result;
        else {
          // ctxmeta.$statusCode = 400;
          return { message: 'An error occurred when set printing' };
        }
      } else {
        // ctx.meta.$statusCode = 400;
        return { message: 'Invalid or missing parameters' };
      }
    } catch (e) {
      console.log(e);
      // ctx.meta.$statusCode = 500;
    }
  }

  async createRequest(params) {
    try {
      const request = params;

      if (!!request.REQUEST_FILE) {
        const base64Parts1 = request.REQUEST_FILE.split(';base64,');
        const base641 = base64Parts1.pop();
        fs.mkdir(`upload/${request.REQUEST_AUTHOR}`, callbackFolder);
        const path1 = `upload/${request.REQUEST_AUTHOR}/${Date.now()}.pdf`;
        fs.writeFile(path1, base641, 'base64', callbackFolder);
        request.REQUEST_FILE = `${process.env.SERVER_ROOT}${path1}`;
      }

      console.log(request);

      let pblmDateString = 'NULL';
      if (request.REQUEST_PBLM_DATE) {
        const pblmDate = new Date(request.REQUEST_PBLM_DATE);
        if (isNaN(pblmDate.getTime())) {
          throw new Error('Invalid date format for REQUEST_PBLM_DATE');
        }
        pblmDateString = pblmDate.toISOString();
      }

      console.log(request);

      const result = await this.requestModel.sequelize
        ?.query(`[dbo].[INSERTION_REQUEST]
                @REQUEST_ID="${request.REQUEST_ID || 'NULL'}",
                @REQUEST_CATEGORY_ID="${request.REQUEST_CATEGORY_ID}",
                @CLASS_ID="${request.CLASS_ID || ' '}",
                @SUBJECT_ID="${request.SUBJECT_ID || ' '}",
                @REPRO_COPY_NUMBER=${request.REPRO_COPY_NUMBER || 0},
                @REPRO_STUDENT_COUNT=${request.REPRO_STUDENT_COUNT || 0},
                @REQUEST_FILE="${request.REQUEST_FILE || ' '}",
                @REQUEST_PBLM_DATE=${pblmDateString !== 'NULL' ? `'${pblmDateString}'` : 'NULL'},
                @REQUEST_PBLM_WEEK="${request.REQUEST_PBLM_WEEK || ' '}",
                @REQUEST_AUTHOR="${request.REQUEST_AUTHOR || ' '}",
                @CONTRACT_NUMBER="${request.CONTRACT_NUMBER || ' '}",
                @TH_DISPLAYED=${request.TH_DISPLAYED || 'NULL'},
                @TH_EXPECTED=${request.TH_EXPECTED || 'NULL'},
                @VH_DISPLAYED=${request.VH_DISPLAYED || 'NULL'},
                @VH_EXPECTED=${request.VH_EXPECTED || 'NULL'},
                @TI_DISPLAYED=${request.TI_DISPLAYED || 'NULL'},
                @TI_EXPECTED=${request.TI_EXPECTED || 'NULL'},
                @AMOUNT_RECEIVED=${request.AMOUNT_RECEIVED || 'NULL'},
                @AMOUNT_EXPECTED=${request.AMOUNT_EXPECTED || 'NULL'},
                @REQUEST_PBLM_HOUR_END=${request.REQUEST_PBLM_HOUR_END ? '"' + request.REQUEST_PBLM_HOUR_END + '"' : 'NULL'},
                @REQUEST_PBLM_HOUR_START=${request.REQUEST_PBLM_HOUR_START ? '"' + request.REQUEST_PBLM_HOUR_START + '"' : 'NULL'},
                @REQUEST_OBJECT="${request.REQUEST_OBJECT || 'N/A'}",
                @DESCRIPTION='${encode(request.DESCRIPTION || '') || ' '}',
                @REQUEST_UNITY_ID="${request.REQUEST_UNITY_ID || (request.REQUEST_CATEGORY_ID === '0601' ? request.BRANCH_ABREVIATION : 'SENG')}",
                @REQUEST_STATUS="${request.REQUEST_STATUS || 'REGISTERED'}",
                @createdAt='${new Date().toISOString().split('T')[0]}',
                @updatedat='${new Date().toISOString().split('T')[0]}'
            `);

      if (result) {
        return result;
      } else {
        return { message: 'missing or incorrect parameters' };
      }
    } catch (e) {
      console.log(e);
      throw new Error('An error occurred while creating the request.');
    }
  }


  async getReport(params) {
    try {
      const {
        sender,
        receiver,
        category,
        startDate,
        endDate,
        labelDecision,
        regime,
      } = params;
      const result = await this.requestModel.sequelize?.query(`
        SELECT DISTINCT rs.REQUEST_ID, rs.RSTEPCONFIG_ID, r.REQUEST_CATEGORY_ID,r.CLASS_ID, rs.createdAt, rs.RSTEP_STATUS
         FROM REQUEST_STEPS rs JOIN REQUESTS r ON r.REQUEST_ID = rs.REQUEST_ID
         WHERE rs.RSTEPCONFIG_ID LIKE '${sender}%${receiver}'
            AND r.REQUEST_ID LIKE '%${category}@%'
            AND rs.createdAt BETWEEN '${startDate}' AND '${endDate}'
            AND rs.RSTEP_STATUS LIKE '%${labelDecision}%'
            AND r.CLASS_ID LIKE '%/${regime}%'
         `);
      console.log(result);
      if (result) {
        return result;
      } else {
        return { message: 'missing or incorrect parameters' };
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getRequestsForBatch(batch) {
    let reqStepsBatch = serializer(await this.requestStepBatchesModel.findAll({ where: { RBATCH_ID: batch } }));
    let requests = serializer(await this.requestModel.findAll({
      where: { REQUEST_ID: { [Op.in]: reqStepsBatch.map(r => r.REQUEST_ID) } },
      include: [
        {
          model: this.employeesModel,
          attributes: [
            'EMPLOYEE_ID',
            'LASTNAME',
            'FIRSTNAME',
          ],
        },
      ],
    }));
    requests = requests.map(r => {
      let d = { ...r, ...r.Employee };
      delete d.Employee;
      return d;
    });
    return requests ? requests : null;
  }
}
