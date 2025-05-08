import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import * as _ from 'lodash';
// import { OrganizationGroupsService } from '../organization-groups/organization-groups.service';
import {EmployeeSubjects} from "../../../models/employee-subjects";
import {Employees} from "../../../models/employees";
import {Subjects} from "../../../models/subjects";
import {Classes} from "../../../models/classes";
import {serializer} from "../../../helpers/func";

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Classes) private classModel: typeof Classes,
    @InjectModel(Employees) private employeeModel: typeof Employees,
    @InjectModel(EmployeeSubjects)
    private employeeSubjectModel: typeof EmployeeSubjects,
    @InjectModel(Subjects) private subjectModel: typeof Subjects,
    // private organizationService: OrganizationGroupsService,
  ) {}

  async listAll() {
    const result = serializer(await this.classModel.findAll());
    return result.length === 0 ? [] : result;
  }

  async findOne(params) {
    const result = serializer(
      await this.classModel.findOne({
        where: {
          [Op.or]: [
            { CLASS_ID: { [Op.like]: `%${params.filter}%` } },
            { id: { [Op.like]: `%${params.filter}%` } },
          ],
        },
      }),
    );
    return result ? null : result;
  }

  async deleteClass(id) {
    return await this.classModel.destroy({ where: { CLASS_ID: id } });
  }

  async listOfSchool() {
    const result = await this.classModel.findAll({
      attributes: [
        ['DISTINCT BRANCH_ABREVIATION', 'BRANCH_ABREVIATION'],
        'BRANCH_NAME',
        'BRANCH_ID',
      ],
      raw: true,
    });
    console.log(result);
    return result.length < 1 ? [] : result;
  }

  async employeesAffectionSchool(employee): Promise<any[]> {
    let result: any = serializer(
      await this.classModel.findAll({
        include: [
          {
            required: true,
            model: this.subjectModel,
            include: [
              {
                required: true,
                model: this.employeeSubjectModel,
                where: { EMPLOYEE_ID: employee },
                attributes: ['EMPLOYEE_ID'],
              },
            ],
          },
        ],
        attributes: [
          'CLASS_ID',
          'BRANCH_ABREVIATION',
          'BRANCH_NAME',
          'BRANCH_ID',
        ],
      }),
    );
    result = result.map((elt) => {
      const d = { ...elt, EmployeeSubject: elt.Subject.EmployeeSubject };
      delete d.Subject;
      return d;
    });
    return result.length === 0 ? [] : _.uniqBy(result, 'BRANCH_ID');
  }

  async schoolClasses(branch): Promise<any[]> {
    const result = await this.classModel.findAll({
      where: { BRANCH_ABREVIATION: branch },
    });
    return result.length === 0 ? [] : result;
  }

  // async setDepartment(params) {
  //   const group = await this.organizationService.findOne({
  //     filter: params.department,
  //   });
  //   const data = await this.classModel.findOne(params);
  //
  //   let oldGroupChildren: any;
  //   let oldGroupClasses: any;
  //   let result: any;
  //
  //   if (data) {
  //     let groupStatus;
  //
  //     oldGroupChildren = await this.organizationService.countParentChildren({
  //       filter: group.ORGA_GROUP_ID,
  //     });
  //     oldGroupClasses = await this.classModel.count({
  //       where: { ORGANIZATION_GROUP_ID: group.ORGA_GROUP_ID },
  //     });
  //
  //     if (oldGroupChildren > 0 && oldGroupClasses > 0) groupStatus = 'G-HYBRID';
  //     else if (oldGroupChildren > 0 && oldGroupClasses === 0)
  //       groupStatus = 'G-GROUP';
  //     else if (oldGroupChildren === 0 && oldGroupClasses > 0)
  //       groupStatus = 'G-CLASS';
  //     else groupStatus = 'G-CLASS';
  //     await this.organizationService.update({
  //       filter: group.ORGA_GROUP_ID,
  //       groupStatus,
  //     });
  //     result = await this.classModel.update(
  //       { ORGANIZATION_GROUP_ID: params.department },
  //       { where: { id: params.classId } },
  //     );
  //     return result ?? null;
  //   }
  // }

  async affectedSchoolClasses(params): Promise<any[]> {
    const result: any[] = await this.classModel.findAll({
      where: { BRANCH_ABREVIATION: params.school },
      include: [
        {
          required: true,
          model: this.subjectModel,
          include: [
            {
              required: true,
              model: this.employeeSubjectModel,
              where: {
                EMPLOYEE_ID: params.employee,
              },
              attributes: ['EMPLOYEE_ID'],
            },
          ],
        },
      ],
      attributes: ['CLASS_ID', 'CLASS_NAME'],
    });
    return result.length === 0 ? [] : _.uniqBy(serializer(result), 'CLASS_ID');
  }
}
