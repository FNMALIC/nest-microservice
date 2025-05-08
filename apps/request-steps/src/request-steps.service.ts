import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RequestSteps } from './request-steps';
import { RequestStepConfigs } from '../request-step-configs/request-step-configs';
import { LabelDecisions } from '../label-decisions/label-decisions';
import * as _ from 'lodash';
import { Op } from 'sequelize';
import { Requests } from '../requests/requests';
import { Employees } from '../employees/employees';
import { RequestStatus } from '../request-status/request-status';
import { Mail } from 'main-app/helpers/mail';
import { serializer } from '../../helpers/func';

@Injectable()
export class RequestStepsService {
  constructor(
    @InjectModel(RequestSteps)
    private requestStepModel: typeof RequestSteps,
    @InjectModel(RequestStepConfigs)
    private requestStepConfigModel: typeof RequestStepConfigs,
    @InjectModel(LabelDecisions)
    private labelDecisionModel: typeof LabelDecisions,
    @InjectModel(Requests)
    private requestModel: typeof Requests,
    @InjectModel(Employees)
    private employeeModel: typeof Employees,
    @InjectModel(RequestStatus)
    private requestStatusModel: typeof RequestStatus,
  ) {
  }

  async getCommentRequest(params) {
    try {
      const RequestStepConfig = await this.requestStepConfigModel;
      const LabelDecision = await this.labelDecisionModel;

      const result = serializer(await this.requestStepModel.findAll({
        include: [
          { model: RequestStepConfig },
          {
            model: LabelDecision,
            attributes: ['LIBELLE'],
          },
        ],
        where: {
          REQUEST_ID: params.id,
        },
        attributes: ['id', 'RSTEP_COMM', 'createdAt'],
      }));
      return result ? result : null;
    } catch (e) {
      console.log(e);
    }
  }

  async getRequestStepsById(params) {
    try {
      const result = await this.requestStepModel.findAll({
        where: { id: params.id },
      });

      if (!result) {
        return {
          statusCode: '204',
        };
      }
      return result;
    } catch (e) {
      console.log(e);
      return {
        statusCode: '500',
      };
    }
  }

  async getRequestLastStepForBatches(params) {
    const RequestStepConfig = await this.requestStepConfigModel;
    let config = serializer(await RequestStepConfig.findAll({
      where: {
        RSTEP_DEST_ID: params.RSTEP_DEST_ID,
        RSTEP_UNITY_ID: params.RSTEPCONFIG_ID,
      },
    }));
    let result: any = await this.requestStepModel.sequelize?.query(`
            SELECT r1.id,
                   r1.REQUEST_ID,
                   r2.RSTEP_DEST_ID,
                   r.REQUEST_AUTHOR,
                   c.S_CATEGORIE as REQUEST_CATEGORY_ID,
                   r.REQUEST_OBJECT,
                   e.LASTNAME,
                   e.FIRSTNAME
            FROM REQUEST_STEPS r1
                     JOIN REQUESTS r ON r.REQUEST_ID = r1.REQUEST_ID
                     JOIN REQUEST_STEPS rs ON (r.REQUEST_ID = rs.REQUEST_ID)
                     JOIN EMPLOYEES e ON e.EMPLOYEE_ID = r.REQUEST_AUTHOR
                     JOIN REQUESTS_CATEGORIES c ON c.ID_SCAT = r.REQUEST_CATEGORY_ID
                     JOIN REQUEST_STEP_CONFIGS r2 ON r2.RSTEP_ID = r1.RSTEPCONFIG_ID
            WHERE r.REQUEST_UNITY_ID ${params.RSTEP_DEST_ID === 'ADM' ? 'like \'%%\'' : `in (${config.map((c) => '\'' + c.RSTEP_UNITY_ID + '\'')})`}
              AND r.REQUEST_UNITY_TRANSMISSIBLE = 1
              AND r2.RSTEP_DEST_ID = '${params.RSTEP_DEST_ID}'
              AND r.PRINTED = 1
        `);

    result = _.uniqBy(result[0], 'REQUEST_ID');
    if (!result || result.length === 0) return null;
    return result;
  }

  async getRequestStepByIds(params) {
    let result = serializer(await this.requestStepModel.findAll({
      include: [this.requestStepConfigModel],
      where: {
        REQUEST_ID: {
          [Op.in]: params.ids,
        },
      },
      attributes: ['id', 'REQUEST_ID'],
    }));
    return result ?? null;
  }

  async createRequestStep(data) {
    const Request = this.requestModel;
    const Employee = this.employeeModel;
    const LabelDecisions = this.labelDecisionModel;
    const RequestStatus = this.requestStatusModel;

    let request = serializer(await Request.findOne({
      where: { REQUEST_ID: data.REQUEST_ID },
      attributes: ['REQUEST_AUTHOR', 'REQUEST_ID'],
    }));

    let employee = serializer(await Employee.findOne({
      where: { EMPLOYEE_ID: request.REQUEST_AUTHOR },
    }));

    let decision = serializer(await LabelDecisions.findOne({
        where: { id: parseInt(data.RSTEP_DECISION) },
      }),
    );
    let status = serializer(await RequestStatus.findOne({
        where: { REQ_STATUS_ID: decision.REQ_STATUS_ID },
      }),
    );

    const result = await this.requestStepModel.sequelize?.query(`
  EXEC [dbo].[INSERTION_REQUEST_STEP]
    @REQUEST_ID=:requestId,
    @RSTEPCONFIG_ID=:rstepConfigId,
    @RSTEP_DECISION=:rstepDecision,
    @RSTEP_COMM=:rstepComm,
    @RSTEP_STATUS=:rstepStatus,
    @RSTEP_TIME=:rstepTime,
    @createdAt=:createdAt,
    @updatedAt=:updatedAt
`, {
      replacements: {
        requestId: data.REQUEST_ID || '',
        rstepConfigId: data.RSTEPCONFIG_ID || ' ',
        rstepDecision: data.RSTEP_DECISION || ' ',
        rstepComm: data.RSTEP_COMM || ' ',
        rstepStatus: status?.REQ_STATUS_LABEL || ' ',
        rstepTime: data.RSTEP_TIME || new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });


    if (
      status.REQ_STATUS_LABEL === 'VALIDATED' ||
      status.REQ_STATUS_LABEL === 'REJECTED'
    )
      Mail.closedRequest(request, employee).then();

    return result ?? null;
  }
}
