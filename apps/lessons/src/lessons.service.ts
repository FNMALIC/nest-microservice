import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Lessons} from '../../../models/lessons';
import {Op} from 'sequelize';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lessons) private lessonsModel: typeof Lessons,
  ) {
  }

  async planning(params) {
    let result = await this.lessonsModel.findAll({
      where: {
        Teacher_ID: params.EMPLOYEE_ID,
        Lesson_Date: {
          [Op.between]: [params.START_DATE, params.END_DATE],
        },
      },
    });

    if (result.length === 0) return null;
    return result;
  }
}
