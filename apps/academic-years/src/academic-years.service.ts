import {Injectable} from '@nestjs/common';
import {AcademicYears} from '../../../models/academic-years';
import {InjectModel} from '@nestjs/sequelize';
import {serializer} from '../../../helpers/func';
import {MessagePattern} from "@nestjs/microservices";

@Injectable()
export class AcademicYearsService {
  constructor(
    @InjectModel(AcademicYears) private yearModel: typeof AcademicYears,
  ) {
  }

  @MessagePattern({ cmd: 'findAll' })
  async findAll() {
    const result = serializer(await this.yearModel.findAll());
    return result.length === 0 ? [] : result;
  }

  async activate(params: any) {
    return await this.yearModel.update(
      {ACTIVATED: params.status},
      {where: {id: params.id}},
    );
  }
}
