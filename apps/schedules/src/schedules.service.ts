import {Injectable} from '@nestjs/common';
import axios from 'axios';
import {AcademicYears} from "../../../models/academic-years";
import {InjectModel} from "@nestjs/sequelize";
import * as moment from 'moment';
import {Mail} from "../../../helpers/mail";
import {Classes} from "../../../models/classes";
import {Employees} from "../../../models/employees";
import {EmployeeSubjects} from "../../../models/employee-subjects";
import {Lessons} from "../../../models/lessons";
import PaymentFees from "../../../models/payment-fees";
import {Students} from "../../../models/students";
import {Subjects} from "../../../models/subjects";
import PaymentNetworks from "../../../models/payment-networks";
import {Specialities} from "../../../models/specialities";
import {Op, Sequelize} from "sequelize";
import {serializer} from "../../../helpers/func";
import * as _ from "lodash";
import * as fs from "node:fs";
import * as https from "node:https";
import {Cron, CronExpression} from "@nestjs/schedule";

@Injectable()
export class SchedulesService {

  constructor(
    @InjectModel(AcademicYears) private yearModel: typeof AcademicYears,
    @InjectModel(Classes) private classesModel: typeof Classes,
    @InjectModel(Employees) private employeeModel: typeof Employees,
    @InjectModel(EmployeeSubjects) private employeeSubjModel: typeof EmployeeSubjects,
    @InjectModel(Lessons) private lessonsModel: typeof Lessons,
    @InjectModel(PaymentFees) private paymentFees: typeof PaymentFees,
    @InjectModel(Students) private studentModel: typeof Students,
    @InjectModel(Subjects) private subjectsModel: typeof Subjects,
    @InjectModel(PaymentNetworks) private paymentNetworksModel: typeof PaymentNetworks,
    @InjectModel(Specialities) private specialities: typeof Specialities,
  ) {
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM, {timeZone: 'Africa/Douala'})
  async import_years(): Promise<void> {
    console.log('\nStarting importation of academic year list');
    const url = `${process.env.academy}api/year/v1/LIST?ApiKey=${process.env.apiKey}&SchoolID=IUC`;
    const STARTING_TIME = new Date();

    try {
      const res = await axios.get(url);

      if (res.status !== 200) {
        console.error('Error: unexpected response status', res.status);
        return;
      }

      const array = res.data;
      console.log('\nFetching new data from year list');

      const academicYear = await this.yearModel.findAll({raw: true});

      const ROWS = array
        .filter(elt => !academicYear.find(e => e?.YEAR_ID === elt.Year_ID))
        .map(elt => ({
          YEAR_ID: elt.Year_ID,
          YEAR_NAME: elt.Year_Name,
          COUNT_TOTAL_STUDENT: elt.Year_Count_Students_Total || 0,
          COUNT_FEMALE_STUDENT: elt.Year_Count_Students_Female || 0,
          COUNT_MALE_STUDENT: elt.Year_Count_Students_Male || 0,
        }));

      let OVERALL_STATUS = 'IMPORTATION CANCELED';
      let DETAILS = 'Importation was cancelled because there was no new record found during fetching';

      if (ROWS.length > 0) {
        await this.yearModel.bulkCreate(ROWS);
        OVERALL_STATUS = 'IMPORTATION DONE WITH SUCCESS';
        DETAILS = undefined;
      }

      const ENDING_TIME = new Date();
      const EXECUTION_DURATION = moment.duration(moment(ENDING_TIME).diff(moment(STARTING_TIME))).asMilliseconds();

      await Mail.reportTaskInfo({
        TASK_NAME: 'ACADEMIC YEARS IMPORTATION',
        STARTING_TIME,
        ENDING_TIME,
        OVERALL_STATUS,
        EXECUTION_DURATION,
        DETAILS,
      });

      console.log('Stopping importation of year list\n');

    } catch (error) {
      console.error('Error during academic year importation:', error.message);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_2AM, {timeZone: 'Africa/Douala'})
  async import_classes() {
    const url = `${process.env.academy}api/class/v1/LIST?ApiKey=${process.env.apiKey}&Year=${process.env.YEAR}&SchoolID=IUC`;
    const STARTING_TIME = new Date();
    axios.get(url).then(async (res) => {
      if (res.status === 200) {
        const array = res.data;
        const CLASSES = await this.classesModel.findAll({raw: true});
        let OVERALL_STATUS: string, DETAILS: string;
        const ROWS = array
          .filter((elt) => !CLASSES.find((e) => e?.CLASS_ID === elt.Class_ID))
          .map((elt) => {
            return {
              CLASS_ID: elt.Class_ID,
              YEAR_ID: process.env.YEAR,
              CLASS_NAME: elt.Class_Name,
              SPECIALTY_ID: elt.Speciality_ID,
              SPECIALTY_NAME: elt.Speciality_Name,
              SPECIALTY_DESCRIPTION: elt.Speciality_Description,
              LEVEL_ID: elt.Level_ID,
              LEVEL_NAME: elt.Level_Name,
              BRANCH_ID: elt.Branch_ID,
              BRANCH_ABREVIATION: elt.Branch_Abreviation,
              BRANCH_NAME: elt.Branch_Name,
              CYCLE_ID: elt.Cycle_ID,
              CYCLE_NAME: elt.Cycle_Name,
              CLASS_COUNT_STUDENTS_TOTAL: elt.Class_Count_Students_Total,
              CLASS_COUNT_STUDENTS_FEMALE: elt.Class_Count_Students_Female,
              CLASS_COUNT_STUDENTS_MALE: elt.Class_Count_Students_Male,
            };
          });
        if (ROWS.length > 0) {
          await Classes.bulkCreate(ROWS);
          await Classes.destroy({
            where: {CLASS_ID: {[Op.notIn]: array.map((cl) => cl.Class_ID)}},
          });
          OVERALL_STATUS = `IMPORTATION DONE WITH SUCCESS`;
        } else {
          OVERALL_STATUS = `IMPORTATION CANCELED`;
          DETAILS = `Importation was cancelled because there was no new record found during fetching`;
        }
        const ENDING_TIME = new Date();
        const EXECUTION_DURATION = moment
          .duration(moment(ENDING_TIME).diff(moment(STARTING_TIME)))
          .milliseconds();
        await Mail.reportTaskInfo({
          TASK_NAME: 'CLASSES IMPORTATION',
          STARTING_TIME,
          ENDING_TIME,
          OVERALL_STATUS,
          EXECUTION_DURATION,
          DETAILS,
        });
      } else {
        console.log('error connection to academy');
      }
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_3AM, {timeZone: 'Africa/Douala'})
  async import_employee_subject() {
    console.log('\nstarting importation of employee subjects list');
    const employeeSubjects = await this.employeeSubjModel.findAll({
      raw: true,
    });
    const employees = await Employees.findAll({
      raw: true,
      where: {ACTIVATED: true},
      attributes: ['EMPLOYEE_ID'],
    });

    const STARTING_TIME = new Date();
    let OVERALL_STATUS: string, DETAILS: string;
    let ROWS_COUNT = 0;
    for (const emp of employees) {
      const url = `${process.env.academy}api/teacher/v1/SUBJECTS?ApiKey=${process.env.apiKey}&Year=${process.env.YEAR}&SchoolID=IUC&TeacherId=${emp.EMPLOYEE_ID}`;
      await axios.get(url).then(
        async (res) => {
          const array = res.data;
          if (array?.length > 0) {
            const ROWS =
              _.uniqBy(
                array,
                (item: any) =>
                  emp.EMPLOYEE_ID +
                  item.Subject_ID +
                  item.Subject_Abreviation_Class +
                  item.Year_Name +
                  item.Class_ID,
              )
                .filter(
                  (elt: any) =>
                    !employeeSubjects.find(
                      (e) =>
                        e.SUBJECT_ID === elt.Subject_ID &&
                        e.EMPLOYEE_ID === emp.EMPLOYEE_ID &&
                        e.CLASS_ID === elt.Class_ID &&
                        e.YEAR_NAME === elt.Year_Name,
                    ),
                )
                .map((eSub: any) => {
                  return {
                    SUBJECT_ID: eSub.Subject_ID,
                    EMPLOYEE_ID: emp.EMPLOYEE_ID,
                    SCHOOL_ID: eSub.School_ID,
                    CLASS_ID: eSub.Class_ID,
                    YEAR_NAME: eSub.Year_Name,
                    YEAR_START: eSub.Year_Begin_Date,
                    YEAR_END: eSub.Year_End_Date,
                    YEAR_ID: process.env.YEAR,
                    LEVEL_ID: eSub.Level_ID,
                    SUBJECT_STATUS: eSub.Subject_Status,
                    SUBJECT_PERIOD_POSITION: eSub.Subject_Periode_Position,
                    SUBJECT_ABREVIATION_CLASS: eSub.Subject_Abreviation_Class,
                  };
                });
            ROWS_COUNT += ROWS.length;
            await EmployeeSubjects.bulkCreate(ROWS);
          }
        },
        (err) => {
          console.log(err);
        },
      );
    }
    if (ROWS_COUNT > 0) {
      OVERALL_STATUS = `IMPORTATION DONE WITH SUCCESS`;
      DETAILS = `Importation was done successfully and we have ${ROWS_COUNT} new record found during fetching`;
    } else {
      OVERALL_STATUS = `IMPORTATION CANCELED`;
      DETAILS = `Importation was cancelled because there was no new record found during fetching`;
    }
    const ENDING_TIME = new Date();
    const EXECUTION_DURATION = moment
      .duration(moment(ENDING_TIME).diff(moment(STARTING_TIME)))
      .milliseconds();
    await Mail.reportTaskInfo({
      TASK_NAME: 'EMPLOYEE-SUBJECTS IMPORTATION',
      STARTING_TIME,
      ENDING_TIME,
      OVERALL_STATUS,
      EXECUTION_DURATION,
      DETAILS,
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_4AM, {timeZone: 'Africa/Douala'})
  async cleaner_employee_subject() {
    const employeeSubjects = await this.employeeSubjModel.findAll({
      attributes: ['id', 'EMPLOYEE_ID', 'SUBJECT_ID', 'CLASS_ID', 'YEAR_NAME'],
    });
    const uniqueSubjects = _.uniqBy(
      employeeSubjects,
      (item) =>
        item.EMPLOYEE_ID + item.SUBJECT_ID + item.CLASS_ID + item.YEAR_NAME,
    );

    await this.employeeSubjModel.destroy({
      where: {
        [Op.or]: {
          SUBJECT_ABREVIATION_CLASS: null,
          CLASS_ID: null,
        },
      },
    });

    for (const emp of uniqueSubjects) {
      const count = await this.employeeSubjModel.count({
        where: {
          EMPLOYEE_ID: emp.EMPLOYEE_ID,
          SUBJECT_ID: emp.SUBJECT_ID,
          YEAR_NAME: emp.YEAR_NAME,
          CLASS_ID: emp.CLASS_ID,
        },
      });
      if (count > 1) {
        await this.employeeSubjModel.destroy({
          where: {
            EMPLOYEE_ID: emp.EMPLOYEE_ID,
            SUBJECT_ID: emp.SUBJECT_ID,
            YEAR_NAME: emp.YEAR_NAME,
            CLASS_ID: emp.CLASS_ID,
            id: {[Op.not]: emp.id},
          },
        });
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_5AM, {timeZone: 'Africa/Douala'})
  async cleaner_employees() {
    const allEmps: any = await this.employeeModel.findAll({raw: true});
    const dir = fs.readdirSync('upload');

    for (const emp of allEmps) {
      const doublons = allEmps
        .filter((e) => e.EMPLOYEE_ID === emp.EMPLOYEE_ID && e.id !== emp.id)
        .map((e) => e.id);
      if (doublons.length > 0) {
        await this.employeeModel.destroy({
          where: {id: {[Op.in]: doublons}},
        });
      }

      if (!dir.includes(emp.EMPLOYEE_ID)) {
        await this.employeeModel.update(
          {
            NIU_LINK: null,
            CNPS_LINK: null,
            CV_LINK: null,
            IDENTITY1: null,
            IDENTITY2: null,
            RIB_LINK: null,
            IDENTITY1_PASSPORT: null,
            IDENTITY2_PASSPORT: null,
          },
          {where: {EMPLOYEE_ID: emp.EMPLOYEE_ID}},
        );
      }
    }

    const badPhones = allEmps
      .filter((e) => e.NUMPHONE?.length > 14 || e.NUMPHONE?.length <= 9)
      .map((e) => e.id);
    if (badPhones.length > 0) {
      await this.employeeModel.update(
        {NUMPHONE: null},
        {where: {id: {[Op.in]: badPhones}}},
      );
    }

    const badPhones2 = allEmps
      .filter((e) => e.NUMPHONE2?.length > 14 || e.NUMPHONE2?.length <= 9)
      .map((e) => e.id);
    if (badPhones2.length > 0) {
      await this.employeeModel.update(
        {NUMPHONE2: null},
        {where: {id: {[Op.in]: badPhones2}}},
      );
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM, {timeZone: 'Africa/Douala'})
  async birthday_employees() {
    const today = new Date();

    const employees = serializer(
      await this.employeeModel.findAll({
        where: {
          ACTIVATED: true,
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn('MONTH', Sequelize.col('BIRTHDATE')),
              today.getMonth() + 1,
            ),
            Sequelize.where(
              Sequelize.fn('DAY', Sequelize.col('BIRTHDATE')),
              today.getDate(),
            ),
          ],
        },
        attributes: [
          'BIRTHDATE',
          'FIRSTNAME',
          'LASTNAME',
          'EMAIL',
          'EMPLOYEE_ID',
        ],
      }),
    );

    employees.forEach((employee: any) => {
      Mail.birthdayEmail({
        ...employee,
        TODAY: new Date().toLocaleDateString('en', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      });
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_7AM, {timeZone: 'Africa/Douala'})
  async import_employees() {
    console.log('sjjj')
    const Employees = this.employeeModel;
    const STARTING_TIME = new Date();
    const url = `${process.env.academy}api/teacher/v1/LIST?ApiKey=${process.env.apiKey}&SchoolID=IUC&Year=${process.env.YEAR}`;
    axios.get(url).then(async (res) => {
      if (res.status === 200) {
        const objects = res.data;
        let OVERALL_STATUS: string, DETAILS: string;
        const oldEmployeesList = serializer(await Employees.findAll());
        let ROWS = _.uniqBy(objects, 'Teacher_ID')
          ?.filter(
            (e: any) =>
              !oldEmployeesList.find(
                (e2) => e2.EMPLOYEE_ID === e.Teacher_ID,
              ),
          )
          .map((elt: any) => {
            return {
              EMPLOYEE_ID: elt.Teacher_ID,
              FIRSTNAME: elt.Teacher_First_Name,
              LASTNAME: elt.Teacher_Last_Name,
              GENDER: elt.Teacher_Gender,
              BIRTHDATE: elt.Teacher_Birth_Date,
              BIRTHPLACE: elt.Teacher_Birth_Place,
              NUMPHONE: elt.Teacher_Phone_Number,
              EMAIL: elt.Teacher_Email,
              EMAIL_VERIFIED: false,
              ACTIVATED: false,
            };
          });
        if (ROWS.length > 0) {
          await Employees.bulkCreate(ROWS);
          OVERALL_STATUS = `IMPORTATION DONE WITH SUCCESS`;
          DETAILS = `Importation was done successfully and we have ${ROWS.length} new record found during fetching`;
        } else {
          OVERALL_STATUS = `IMPORTATION CANCELED`;
          DETAILS = `Importation was cancelled because there was no new record found during fetching`;
        }
        const ENDING_TIME = new Date();
        const EXECUTION_DURATION = moment
          .duration(moment(ENDING_TIME).diff(moment(STARTING_TIME)))
          .milliseconds();
        await Mail.reportTaskInfo({
          TASK_NAME: 'EMPLOYEES IMPORTATION.',
          STARTING_TIME,
          ENDING_TIME,
          OVERALL_STATUS,
          EXECUTION_DURATION,
          DETAILS,
        });
      } else {
        console.log('error connection to academy');
      }
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_8AM, {timeZone: 'Africa/Douala'})
  async handlePlanningNotifications() {
    const employees = await this.employeeModel.findAll({where: {ACCESS_COURSES: true}});
    for (const employee of employees) {
      const startDate = new Date();
      const endDate = new Date();

      startDate.setDate(startDate.getDate() + 2);
      endDate.setDate(endDate.getDate() + 9);

      const lessons = await this.lessonsModel.findAll({
        where: {
          Teacher_ID: employee.EMPLOYEE_ID,
          Lesson_Date: {[Op.between]: [startDate, endDate]},
        },
      });

      if (lessons.length > 0) {
        let html = '<h1 style="text-align: center">PLANNING WEEK</h1>';

        lessons.forEach((lesson) => {
          html += `
            <div style="padding: 12px; margin: 12px; box-shadow: 0 0 16px .1px rgba(0,0,0,.15); border-radius: 4px; background: #fff8e9">
              <div><strong>${lesson.Subject_Name}</strong></div>
              <div>${lesson.Class_ID}</div>
              <div>${lesson.Campus_Name}</div>
              <div>${new Date(lesson.Lesson_Date).toDateString()} ${lesson.Lesson_Begin_Time} - ${lesson.Lesson_End_Time}</div>
              <div>${lesson.Year_Name}</div>
            </div>`;
        });

        await Mail.planning({
          email: employee.EMAIL,
          html,
          startDate,
          endDate,
        });
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_9AM, {timeZone: 'Africa/Douala'})
  async import_lessons() {
    const STARTING_TIME = new Date();
    const startDate = new Date(2024, 8, 1);
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 20);
    let currentDate = new Date(startDate);
    let OVERALL_STATUS: string, DETAILS: string;
    let ROWS_COUNT = 0;
    await Lessons.truncate();
    while (currentDate <= endDate) {
      const url = `${process.env.academy}api/lesson/v1/LIST?ApiKey=${process.env.apiKey}&SchoolID=IUC&BeginDate=${currentDate.toISOString().split('T')[0]}&EndDate=${currentDate.toISOString().split('T')[0]}&LessonStatus=0`;
      currentDate.setDate(currentDate.getDate() + 1);
      let res = await axios.get(url);
      if (res.status == 200) {
        ROWS_COUNT += res.data.length;
        await Lessons.bulkCreate(res.data);
      }
    }
    if (ROWS_COUNT > 0) {
      OVERALL_STATUS = `IMPORTATION DONE WITH SUCCESS`;
      DETAILS = `Importation was done successfully and we have ${ROWS_COUNT} new record found during fetching`;
    } else {
      OVERALL_STATUS = `IMPORTATION CANCELED`;
      DETAILS = `Importation was cancelled because there was no new record found during fetching`;
    }
    const ENDING_TIME = new Date();
    const EXECUTION_DURATION = moment
      .duration(moment(ENDING_TIME).diff(moment(STARTING_TIME)))
      .milliseconds();
    await Mail.reportTaskInfo({
      TASK_NAME: 'PLANNING IMPORTATION',
      STARTING_TIME,
      ENDING_TIME,
      OVERALL_STATUS,
      EXECUTION_DURATION,
      DETAILS,
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM, {timeZone: 'Africa/Douala'})
  async import_payment_fee() {
    const students = await this.studentModel.findAll({raw: true});
    const STARTING_TIME = new Date();
    let OVERALL_STATUS: string, DETAILS: string;
    let ROWS_COUNT = 0;
    for (const emp of students) {
      const url = `${process.env.academy}api/student/v1/PAYMENTS/REGISTRATION?ApiKey=${process.env.apiKey}&RegistrationID=${emp.REGISTRATION_ID}&IncludeValidPayments=true&IncludeDraftPayments=false&IncludeCancelledPayments=false&IncludeReductions=false`;
      await axios.get(url).then(
        async (res) => {
          let stuP = await this.paymentFees.findAll({where: {STUDENT_ID_SCHOOL: emp.STUDENT_ID}});
          const array = res.data;
          if (array?.length > 0) {
            const ROWS = array.filter(p => stuP.find(s => s.PAYMENT_ID == p.Payment_ID) == null).map((item: any) => {
              let d: any = {};
              let keys = Object.keys(item);
              keys.forEach((key) => {
                d[key.toUpperCase()] = item[key];
              });
              return d;
            });
            ROWS_COUNT += ROWS.length;
            await PaymentFees.bulkCreate(ROWS);
          }
        },
        (err) => {
          console.log(err);
        },
      );
    }
    if (ROWS_COUNT > 0) {
      OVERALL_STATUS = `IMPORTATION DONE WITH SUCCESS`;
      DETAILS = `Importation was done successfully and we have ${ROWS_COUNT} new record found during fetching`;
    } else {
      OVERALL_STATUS = `IMPORTATION CANCELED`;
      DETAILS = `Importation was cancelled because there was no new record found during fetching`;
    }
    const ENDING_TIME = new Date();
    const EXECUTION_DURATION = moment
      .duration(moment(ENDING_TIME).diff(moment(STARTING_TIME)))
      .milliseconds();
    await Mail.reportTaskInfo({
      TASK_NAME: 'PAYMENT FEES IMPORTATION',
      STARTING_TIME,
      ENDING_TIME,
      OVERALL_STATUS,
      EXECUTION_DURATION,
      DETAILS,
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_11AM, {timeZone: 'Africa/Douala'})
  async import_schedule() {
    const STARTING_TIME = new Date();
    const url = `${process.env.academy}api/b2ipay/v1/AvailableNetworks?ApiKey=${process.env.apiKey}`;
    axios.get(url).then(async (res: any) => {
      if (res.status === 200) {
        let OVERALL_STATUS: string, DETAILS: string;
        const existingNetworks = serializer(await this.paymentNetworksModel.findAll());
        let ROWS = res.data?.filter((e: any) => !existingNetworks.some((e2) => e2.name === e.name));
        if (ROWS.length > 0) {
          await this.paymentNetworksModel.bulkCreate(ROWS);
          OVERALL_STATUS = `IMPORTATION DONE WITH SUCCESS`;
          DETAILS = `Importation was done successfully and we have ${ROWS.length} new record found during fetching`;
        } else {
          OVERALL_STATUS = `IMPORTATION CANCELED`;
          DETAILS = `Importation was cancelled because there was no new record found during fetching`;
        }
        const ENDING_TIME = new Date();
        const EXECUTION_DURATION = moment
          .duration(moment(ENDING_TIME).diff(moment(STARTING_TIME)))
          .milliseconds();
        await Mail.reportTaskInfo({
          TASK_NAME: 'PAYMENT NETWORKS IMPORTATION.',
          STARTING_TIME,
          ENDING_TIME,
          OVERALL_STATUS,
          EXECUTION_DURATION,
          DETAILS,
        });
      } else {
        console.log('error connection to academy');
      }
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {timeZone: 'Africa/Douala'})
  async import_speciality() {
    const STARTING_TIME = new Date();
    const url = `${process.env.academy}api/speciality/v1/LIST?ApiKey=${process.env.apiKey}&SchoolID=IUC&Year=${process.env.YEAR}`;
    axios.get(url).then(async (res) => {
      if (res.status === 200) {
        const objects = res.data;
        let OVERALL_STATUS: string, DETAILS: string;
        const oldSpecialitiesList = serializer(await this.specialities.findAll());
        let ROWS = _.uniqBy(objects, 'Speciality_ID')
          ?.filter(
            (e: any) =>
              !oldSpecialitiesList.find(
                (e2) => e2.SPECIALITY_ID === e.Speciality_ID,
              ),
          )
          .map((elt: any) => {
            return {
              SPECIALITY_ID: elt.Speciality_ID,
              SPECIALITY_GUID: elt.Speciality_Guid,
              SPECIALITY_NAME: elt.Speciality_Name,
              SPECIALITY_DESCRIPTION: elt.Speciality_Description,
              SPECIALITY_MIN_LEVEL_ID: elt.Speciality_Min_Level_ID,
              SPECIALITY_MIN_LEVEL_NAME: elt.Speciality_Min_Level_Name,
              SPECIALITY_MAX_LEVEL_ID: elt.Speciality_Max_Level_ID,
              SPECIALITY_MAX_LEVEL_NAME: elt.Speciality_Max_Level_Name,
              MINISTRY_ID: elt.Ministry_ID,
              CYCLE_ID: elt.Cycle_Id,
              CYCLE_GUID: elt.Cycle_Guid,
              CYCLE_NAME: elt.Cycle_Name,
              CYCLE_POSITION: elt.Cycle_Position,
              SPECIALITY_HTML_ONLINE_DESCRIPTION: elt.zz_Speciality_HtmlOnlineDescription,
              SPECIALITY_HTML_ONLINE_OBJECTIF: elt.zz_Speciality_HtmlOnlineObjectif,
              SPECIALITY_HTML_ONLINE_DEBOUCHES: elt.zz_Speciality_HtmlOnlineDebouches,
              SPECIALITY_HTML_ONLINE_DOSSIER_CANDIDATURE: elt.zz_Speciality_HtmlOnlineDossierCandidature,
            };
          });
        if (ROWS.length > 0) {
          for (const row of ROWS) {
            await this.specialities.create(row);
          }
          OVERALL_STATUS = `IMPORTATION DONE WITH SUCCESS`;
          DETAILS = `Importation was done successfully and we have ${ROWS.length} new record found during fetching`;
        } else {
          OVERALL_STATUS = `IMPORTATION CANCELED`;
          DETAILS = `Importation was cancelled because there was no new record found during fetching`;
        }
        const ENDING_TIME = new Date();
        const EXECUTION_DURATION = moment
          .duration(moment(ENDING_TIME).diff(moment(STARTING_TIME)))
          .milliseconds();
        await Mail.reportTaskInfo({
          TASK_NAME: 'SPECIALITY IMPORTATION.',
          STARTING_TIME,
          ENDING_TIME,
          OVERALL_STATUS,
          EXECUTION_DURATION,
          DETAILS,
        });
      } else {
        console.log('error connection to academy');
      }
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_1PM, {timeZone: 'Africa/Douala'})
  async import_students() {
    try {
      const STARTING_TIME = new Date();
      let OVERALL_STATUS: string, DETAILS: string;
      let ROWS_COUNT = 0;

      const classes = serializer(await this.classesModel.findAll({attributes: ['CLASS_ID', 'BRANCH_ID']}));
      const oldStudentsList = serializer(await this.studentModel.findAll());
      for (const cls of classes) {
        let retry = 0;
        let success = false;
        const maxRetries: any = process.env.MAX_ACADEMY_RETRY || 3;
        do {
          try {
            const url = `${process.env.academy}api/student/v1/REGISTRATIONS/YEAR/CLASS?ApiKey=${process.env.apiKey}&SchoolID=${cls.BRANCH_ID}&Year=${process.env.YEAR}&ClassID=${cls.CLASS_ID}&IncludeSubjects=false`;
            const response = await axios.get<any[]>(url, {httpsAgent: https.Agent});
            const objects = response.data.filter(elt =>
              !!elt.Student_Email &&
              !!elt.Registration_ID &&
              !!elt.Student_ID_School,
            );
            console.log(`Found ${objects.length} students`);
            if (response.status === 200) {
              const newStudents: any = _.uniqBy(objects, 'Student_ID_School')
                ?.filter(e => !oldStudentsList.find(e2 => e2.STUDENT_ID === e.Student_ID_School));

              if (newStudents.length > 0) {
                try {
                  ROWS_COUNT += newStudents.length;
                  await this.studentModel.bulkCreate(newStudents.map(elt => ({
                    STUDENT_ID: elt.Student_ID_School,
                    LASTNAME: elt.Student_Last_Name,
                    FIRSTNAME: elt.Student_First_Name,
                    BIRTHDATE: elt.Student_Birth_Date,
                    BIRTHPLACE: elt.Student_Birth_Place,
                    GENDER: elt.Student_Gender,
                    REGISTRATION_ID: elt.Registration_ID,
                    REGISTRATION_TYPE: elt.Registration_Type,
                    EMAIL: elt.Student_Email,
                    CLASS_ID: cls.CLASS_ID,
                    EMAIL_VERIFIED: false,
                    ACCESS_COURSES: false,
                  })));
                  success = true;
                } catch (error) {
                  console.error(`Error inserting students for class ${cls.CLASS_ID}:`, error.message);
                }
              } else {
                success = true;
              }

              if (ROWS_COUNT > 0) {
                OVERALL_STATUS = `IMPORTATION DONE WITH SUCCESS`;
                DETAILS = `Importation was done successfully and we have ${ROWS_COUNT} new record found during fetching`;
              } else {
                OVERALL_STATUS = `IMPORTATION CANCELED`;
                DETAILS = `Importation was cancelled because there was no new record found during fetching`;
              }
              const ENDING_TIME = new Date();
              const EXECUTION_DURATION = moment
                .duration(moment(ENDING_TIME).diff(moment(STARTING_TIME)))
                .milliseconds();

              await Mail.reportTaskInfo({
                TASK_NAME: 'STUDENTS IMPORTATION',
                STARTING_TIME,
                ENDING_TIME,
                OVERALL_STATUS,
                EXECUTION_DURATION,
                DETAILS,
              });
            } else {
              console.error('Error connecting to academy');
            }
          } catch (error) {
            console.error(`Error processing class ${cls.CLASS_ID}:`, error.message);
            if (retry === maxRetries) {
              console.error(`Max retries reached for class ${cls.CLASS_ID}`);
            }
            await new Promise((resolve) =>
              setTimeout(resolve, 1000 * (retry + 1)),
            ); // Exponential backoff
          }
          retry++;
        } while (!success && retry < maxRetries);
      }
      // Save final progress
      console.log('Stopping importation of students list\n');
    } catch (error) {
      console.error('Error during import process:', error.message);
      throw error;
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_2PM, {timeZone: 'Africa/Douala'})
  async import_subjects() {

    const STARTING_TIME = new Date();
    let OVERALL_STATUS: string;
    let DETAILS: string;
    let ROWS: any, ROWS_COUNT;

    const result = await this.classesModel.findAll({raw: true});
    const subjects = await this.subjectsModel.findAll({raw: true});

    const _import = async (elt) => {
      const url = `${process.env.academy}api/subject/v1/LIST/CLASS?ApiKey=${process.env.apiKey}&Year=${process.env.YEAR}&SchoolID=IUC&ClassID=${elt?.CLASS_NAME}`;
      await axios.get(url).then(async (res) => {
        if (res.status === 200) {
          const array = res.data;
          if (array.length > 0) {
            ROWS = array.filter((elt) => !subjects.find((e) => e.SUBJECT_ID === elt.Subject_ID && e.YEAR_ID === process.env.YEAR)).map((sub, i, arr) => {
              return {
                CLASS_ID: sub.Class_ID,
                SUBJECT_ID: sub.Subject_ID,
                YEAR_ID: process.env.YEAR,
                SUBJECT_NAME: sub.Subject_Name,
                SUBJECT_SHORTNAME: sub.Subject_Name?.split(' (')[0] || '',
                LEVEL_ID: sub.Level_ID,
                SUBJECT_STATUS: sub.Subject_Status,
                SUBJECT_ABREVIATION: sub.Subject_Abreviation,
                SUBJECT_VH_AB_INITIAL: sub.Subject_VH_AB_Initial,
                SUBJECT_VH_CM_INITIAL: sub.Subject_VH_CM_Initial,
                SUBJECT_VH_EX_INITIAL: sub.Subject_VH_EX_Initial,
                SUBJECT_VH_TD_INITIAL: sub.Subject_VH_TD_Initial,
                SUBJECT_VH_MT_INITIAL: sub.Subject_VH_MT_Initial,
                SUBJECT_VH_TP_INITIAL: sub.Subject_VH_TP_Initial,
                RECURENCE:
                  arr.filter((e) => e.Subject_ID === sub.Subject_ID)
                    .length || 0,
              };
            });
            ROWS_COUNT += ROWS.length;
          }
          console.log('stopping importation of subjects list\n');
        } else console.log('error connection to academy');
      });
    };

    for (let i = 0; i < result.length; i += 5) {
      await _import(result[i]);
      await _import(result[i + 1]);
      await _import(result[i + 2]);
      await _import(result[i + 3]);
      await _import(result[i + 4]);
    }
    if (ROWS_COUNT > 0) {
      OVERALL_STATUS = `IMPORTATION DONE WITH SUCCESS`;
      DETAILS = `Importation was done successfully and we have ${ROWS.length} new record found during fetching`;
    } else {
      OVERALL_STATUS = `IMPORTATION CANCELED`;
      DETAILS = `Importation was cancelled because there was no new record found during fetching`;
    }
    const ENDING_TIME = new Date();
    const EXECUTION_DURATION = moment
      .duration(moment(ENDING_TIME).diff(moment(STARTING_TIME)))
      .milliseconds();

    await Mail.reportTaskInfo({
      TASK_NAME: 'SUBJECTS IMPORTATION',
      STARTING_TIME,
      ENDING_TIME,
      OVERALL_STATUS,
      EXECUTION_DURATION,
      DETAILS,
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_2PM, {timeZone: 'Africa/Douala'})
  async cleaner_subjects() {
    this.subjectsModel.sequelize
      .query(
        `DELETE FROM SUBJECTS WHERE id NOT IN (SELECT MAX(id) FROM SUBJECTS GROUP BY SUBJECT_ID) and YEAR_ID='${process.env.YEAR}'`,
      )
      .then((res) => {
        console.log(`=> ${res[1]} rows cleaned from subjects`);
      });
  }
}
