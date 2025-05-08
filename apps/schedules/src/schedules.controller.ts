import {Controller} from '@nestjs/common';
import {MessagePattern} from '@nestjs/microservices';
import {SchedulesService} from './schedules.service';
import {ConfigService} from "@nestjs/config";

@Controller()
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService, private readonly configService: ConfigService) {
  }

  @MessagePattern({cmd: 'import_years'})
  async import_years(): Promise<any> {
    return this.schedulesService.import_years();
  }

  @MessagePattern({cmd: 'import_classes'})
  async import_classes(): Promise<any> {
    return this.schedulesService.import_classes();
  }

  @MessagePattern({cmd: 'import_employee_subject'})
  async import_employee_subject(): Promise<any> {
    return this.schedulesService.import_employee_subject();
  }

  @MessagePattern({cmd: 'cleaner_employee_subject'})
  async cleaner_employee_subject(): Promise<any> {
    return this.schedulesService.cleaner_employee_subject();
  }

  @MessagePattern({cmd: 'cleaner_employees'})
  async cleaner_employees(): Promise<any> {
    return this.schedulesService.cleaner_employees();
  }

  @MessagePattern({cmd: 'birthday_employees'})
  async birthday_employees(): Promise<any> {
    return this.schedulesService.birthday_employees();
  }

  @MessagePattern({cmd: 'import_employees'})
  async import_employees(): Promise<any> {
    return this.schedulesService.import_employees();
  }

  @MessagePattern({cmd: 'handle_planning_notifications'})
  async handlePlanningNotifications(): Promise<any> {
    return this.schedulesService.handlePlanningNotifications();
  }

  @MessagePattern({cmd: 'import_lessons'})
  async import_lessons(): Promise<any> {
    return this.schedulesService.import_lessons();
  }
}
