import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {col, fn, Op} from 'sequelize';
import * as _ from 'lodash';
import {Classes} from "../../../models/classes";
import {Employees} from "../../../models/employees";
import {EmployeeSubjects} from "../../../models/employee-subjects";
import {Subjects} from "../../../models/subjects";
import {serializer} from "../../../helpers/func";

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Classes) private classModel: typeof Classes,
    @InjectModel(Employees) private employeeModel: typeof Employees,
    @InjectModel(EmployeeSubjects) private employeeSubjects: typeof EmployeeSubjects,
    @InjectModel(Subjects) private subjectModel: typeof Subjects,
  ) {
  }

  async listAll() {
    const result = serializer(await this.classModel.findAll({
      attributes: [
        'id',
        'CLASS_ID',
        'YEAR_ID',
        'CLASS_NAME',
        'SPECIALTY_ID',
        'SPECIALTY_NAME',
        'LEVEL_ID',
        'LEVEL_NAME',
        'BRANCH_ID',
        'BRANCH_NAME',
        'CYCLE_ID',
        'CYCLE_NAME',
      ]
    }));
    return result.length === 0 ? [] : result;
  }

  async findOne(params) {
    return serializer(
      await this.classModel.findOne({
        where: {
          [Op.or]: [
            {CLASS_ID: {[Op.like]: `%${params.filter}%`}},
            {id: {[Op.like]: `%${params.filter}%`}},
          ],
        },
      }),
    );
  }

  async deleteClass(id) {
    return await this.classModel.destroy({where: {CLASS_ID: id}});
  }

  async listOfSchool() {
    const result = serializer(
      await this.classModel.findAll({
        attributes: [
          [fn('DISTINCT', col('BRANCH_ABREVIATION')), 'BRANCH_ABREVIATION'],
          'BRANCH_NAME',
          'BRANCH_ID',
        ],
      })
    );
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
                model: this.employeeSubjects,
                where: {EMPLOYEE_ID: employee},
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
      const d = {...elt, EmployeeSubject: elt.Subject.EmployeeSubject};
      delete d.Subject;
      return d;
    });
    return result.length === 0 ? [] : _.uniqBy(result, 'BRANCH_ID');
  }

  async schoolClasses(branch) {
    return serializer(await this.classModel.findAll({
      attributes: [
        'id',
        'CLASS_ID',
        'YEAR_ID',
        'CLASS_NAME',
        'SPECIALTY_ID',
        'SPECIALTY_NAME',
        'LEVEL_ID',
        'LEVEL_NAME',
        'BRANCH_ID',
        'BRANCH_NAME',
        'CYCLE_ID',
        'CYCLE_NAME',
      ],
      where: {BRANCH_ABREVIATION: branch},
    }));
  }

  async affectedSchoolClasses(params): Promise<any[]> {
    const result: any[] = await this.classModel.findAll({
      where: {BRANCH_ABREVIATION: params.school},
      include: [
        {
          required: true,
          model: this.subjectModel,
          include: [
            {
              required: true,
              model: this.employeeSubjects,
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
