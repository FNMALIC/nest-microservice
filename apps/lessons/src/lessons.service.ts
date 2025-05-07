import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson } from '../../../models/lessons';
import { Op } from 'sequelize';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson) private lessonsModel: typeof Lesson,
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
