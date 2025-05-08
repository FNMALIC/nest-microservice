import {Controller, Inject, OnModuleInit} from '@nestjs/common';
import {SchedulerRegistry} from '@nestjs/schedule';
import {receiver} from '../../../../helpers/func';
import {ClientProxy} from '@nestjs/microservices';
import {ConfigService} from '@nestjs/config';
import {CronJob} from "cron";

@Controller()
export class SchedulesController implements OnModuleInit {
  constructor(
    @Inject('schedules') private readonly schedulesService: ClientProxy,
    private readonly configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {
  }

  async onModuleInit() {
    // @ts-ignore
    this.cronG('import_years', "0 52 9 * * *" || process.env.IMPORT_YEAR_CRON);
    this.cronG('import_classes', process.env.IMPORT_CLASS_CRON);
    this.cronG('import_employee_subject', process.env.IMPORT_CLASS_CRON);
    this.cronG('cleaner_employee_subject', process.env.IMPORT_CLASS_CRON);
    this.cronG('birthday_employees', process.env.IMPORT_CLASS_CRON);
    this.cronG('import_employees', process.env.IMPORT_CLASS_CRON);
    this.cronG('handle_planning_notifications', process.env.IMPORT_CLASS_CRON);
    this.cronG('import_lessons', process.env.IMPORT_CLASS_CRON);
  }

  private cronG(name: string, cronTime: string) {
    const job = new CronJob(cronTime || "0 0 0 * * *", async () => {
      return await receiver(this.schedulesService, name)
    }, null, true, 'Africa/Douala');
    this.schedulerRegistry.addCronJob(name, job);
    job.start();
  }
}
