import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import * as jwt from 'jsonwebtoken';
import * as process from 'node:process';
import {Employees} from "../../../models/employees";
import {Users} from "../../../models/users";
import {RequestGroups} from "../../../models/request-groups";
import {Students} from "../../../models/students";
import {OrganizationGroups} from "../../../models/organization-groups";
import {serializer} from "../../../helpers/func";
import {Mail} from "../../../helpers/mail";
import * as bcrypt from 'bcryptjs';
import {decrypt} from "../../../helpers/cryptogram";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Employees)
    private employeeModel: typeof Employees,
    @InjectModel(Users)
    private userModel: typeof Users,
    @InjectModel(RequestGroups)
    private requestGroupModel: typeof RequestGroups,
    @InjectModel(Students)
    private studentModel: typeof Students,
    @InjectModel(OrganizationGroups)
    private organizationGroupModel: typeof OrganizationGroups,
  ) {
  }

  async loginStepForSendCode(params) {
    const min = 110010,
      max = 987689;

    try {
      const Employee = this.employeeModel;
      const result: any = serializer(
        await Employee.findOne({
          where: {
            EMAIL: params.email,
            EMPLOYEE_ID: params.matricule,
            EMAIL_VERIFIED: true,
          },
          attributes: ['id', 'EMPLOYEE_ID', 'EMAIL'],
        }),
      );

      console.log(result);

      if (!result) return;

      const SIGN_CODE = Math.floor(Math.random() * (max - min + 1) + min);
      const response = await Employee.update(
        {SIGN_CODE},
        {
          where: {id: result.id},
        },
      );
      console.log(response);
      await Mail.codeEmail(result, SIGN_CODE);
      if (response[0] > 0) return {};
      //   else ctx.meta.$statusCode = 204;
    } catch (e) {
      console.log(e);
      //   ctx.meta.$statusCode = 500;
    }
  }

  async loginStepForSendCodeStudent(params) {
    const min = 110010,
      max = 987689;
    try {
      const Student = this.studentModel;

      console.log(0);
      let result: any = serializer(
        await Student.findOne({
          where: {
            EMAIL: params.email,
            STUDENT_ID: params.matricule,
            // EMAIL_VERIFIED: true,
          },
          attributes: ['EMAIL', 'STUDENT_ID'],
        })
      )

      if (!result) return;

      const SIGN_CODE = Math.floor(Math.random() * (max - min + 1) + min);
      const response = await Student.update(
        {SIGN_CODE},
        {where: {STUDENT_ID: result.STUDENT_ID}},
      );
      console.log(0);

      await Mail.codeEmail(result, SIGN_CODE);
      if (response[0] > 0) return {};
    } catch (e) {
      console.error('Login step error:', e);
      throw e;
    }
  }

  async signUp(params) {
    try {
      console.log(params);
      const Employee = this.employeeModel;
      const exists = await Employee.findOne({
        attributes: ['id', 'EMPLOYEE_ID', 'EMAIL_VERIFIED'],
        where: {
          EMPLOYEE_ID: params.matricule,
          EMAIL_VERIFIED: true,
        },
      });

      if (exists) {
        return {};
      } else {
        let result = await Employee.findOne({
          attributes: [
            'id',
            'EMPLOYEE_ID',
            'EMAIL_VERIFIED',
            'LASTNAME',
            'FIRSTNAME',
            'EMAIL',
          ],
          where: {
            EMPLOYEE_ID: params.matricule,
            EMAIL_VERIFIED: false,
          },
        });
        result = serializer(result);
        if (result) return result;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async signUpStudent(params) {
    try {
      const Student = this.studentModel;
      const exists = await Student.findOne({
        where: {
          STUDENT_ID: params.matricule,
          BIRTHDATE: params.birthdate,
          EMAIL_VERIFIED: true,
        },
        raw: true,
      });
      if (exists) {
        return {};
      } else {
        let result = serializer(await Student.findOne({
          where: {
            STUDENT_ID: params.matricule,
            EMAIL_VERIFIED: false,
          },
        }));
        if (result) return result;
      }
    } catch (e) {
      console.log(e);
    }
  }

  // signUpStudent

  async verifyEmail(params) {
    try {
      const Employee = this.employeeModel;
      const {email, matricule} = params;
      console.log(params);

      const hashedEmail = await bcrypt.hash(email, 8);
      const token = jwt.sign({token: hashedEmail}, process.env.SECRET, {
        expiresIn: 3600 * 24,
      });

      await Employee.update(
        {
          EMAIL_VERIFICATION_TOKEN: token,
          EMAIL: email,
          EMAIL_VERIFIED: false,
        },
        {where: {EMPLOYEE_ID: matricule}},
      );

      const resultMail = await Mail.welcomeEmail({
        email: params.email,
        emailsSubject: 'Account verification',
        emailText: 'Please verify your email account',
        token,
        redirectUrl: process.env.ROOT,
      });

      if (resultMail)
        if (resultMail) {
          return {};
        }
    } catch (e) {
      console.log(e);
    }
  }

  async StudentVerifyEmail(params) {
    try {
      const Student = this.studentModel;
      const {email} = params;
      console.log(params);

      const hashedEmail = await bcrypt.hash(email, 8);
      const token = jwt.sign({token: hashedEmail}, process.env.SECRET, {
        expiresIn: 3600 * 24,
      });

      await Student.update(
        {
          EMAIL_VERIFICATION_TOKEN: token,
          EMAIL: email,
          EMAIL_VERIFIED: false,
        },
        {where: {EMAIL: email}},
      );

      const resultMail = await Mail.welcomeEmail({
        email: params.email,
        emailsSubject: 'Account verification',
        emailText: 'Please verify your email account',
        token,
        redirectUrl: process.env.ROOT_STU,
      });

      if (resultMail)
        if (resultMail) {
          return {};
        }
    } catch (e) {
      console.log(e);
    }
  }

  async emailConfirmation(params) {
    try {
      const Employee = this.employeeModel;
      const token = params.token;
      console.log(params);
      try {
        jwt.verify(token, process.env.SECRET);
      } catch (e) {
        if (e.name === 'TokenExpiredError') {
          return {message: 'session expired', expiredAt: e.expiredAt};
        } else {
          return {message: 'invalid token signature !'};
        }
      }

      const emp = await Employee.findOne({
        where: {EMAIL_VERIFICATION_TOKEN: token},
      });
      if (!emp) throw new Error();

      return await emp.update({
        EMAIL_VERIFICATION_TOKEN: null,
        EMAIL_VERIFIED: true,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async codeVerification(params) {
    try {
      const Employee: any = this.employeeModel;
      const emp: any = serializer(
        await Employee.findOne({where: {...params}}),
      );
      if (
        !emp ||
        (Date.now() - new Date(emp.updatedAt).getTime()) / 60000 >= 15
      )
        throw new Error();
      await Employee.update({SIGN_CODE: null}, {where: {...params}});

      const result = serializer(
        await Employee.findOne({
          where: {
            EMPLOYEE_ID: params.EMPLOYEE_ID,
            EMAIL_VERIFIED: true,
          },
        }),
      );
      const token = jwt.sign(
        {
          USERNAME: `${result.FIRSTNAME}${result.LASTNAME}`,
          EMAIL: result.EMAIL,
          id: result.id,
        },
        process.env.SECRET,
        {
          expiresIn: 3600 * 2,
        },
      );

      let response = await Employee.update(
        {TOKEN: token},
        {
          where: {
            id: result.id,
          },
          returning: true,
        },
      );
      response = serializer(response);
      return response[1][0];
    } catch (e) {
      console.error(e);
    }
  }

  async existVerificationStudent(EMAIL) {
    const Student: any = this.studentModel;
    const emp: any = serializer(
      await Student.findOne({where: {EMAIL: EMAIL, ACCESS_COURSES: true}}),
    );
    return emp ?? null;
  }

  async codeVerificationStudent(params) {
    try {
      const Student = this.studentModel;
      const student = serializer(
        await Student.findOne({
          where: {
            SIGN_CODE: params.SIGN_CODE,
            STUDENT_ID: params.STUDENT_ID,
          },
          attributes: ['SIGN_CODE', 'STUDENT_ID', 'EMAIL', 'updatedAt'],
        }),
      );

      if (
        !student ||
        (Date.now() - new Date(student.updatedAt).getTime()) / 60000 >= 15
      ) {
        throw new Error('Invalid or expired verification code');
      }

      // Clear the sign code
      await Student.update(
        {SIGN_CODE: null},
        {
          where: {
            STUDENT_ID: student.STUDENT_ID,
          },
        },
      );

      const result = serializer(
        await Student.findOne({
          where: {
            STUDENT_ID: params.STUDENT_ID,
            EMAIL_VERIFIED: true,
          },
        }),
      );
      const token = jwt.sign(
        {
          USERNAME: result.FIRSTNAME,
          EMAIL: result.EMAIL,
          STUDENT_ID: result.STUDENT_ID,
        },
        process.env.SECRET,
        {
          expiresIn: 3600 * 2,
        },
      );

      let response = await Student.update(
        {EMAIL_VERIFICATION_TOKEN: token},
        {
          where: {
            STUDENT_ID: student.STUDENT_ID,
          },
          returning: true,
        },
      );

      response = serializer(response);
      console.log(response);

      if (result) return response[1][0];
    } catch (error) {
      console.error('Email confirmation error:', error);
      throw error;
    }
  }

  async emailConfirmationStudent(params) {
    try {
      const Student: any = this.studentModel;
      const emp = serializer(await Student.findOne({where: {...params}}));
      if (
        !emp ||
        (Date.now() - new Date(emp.updatedAt).getTime()) / 60000 >= 15
      )
        throw new Error();
      await Student.update({SIGN_CODE: null}, {where: {...params}});

      const result = serializer(
        await Student.findOne({
          where: {
            SIGN_CODE: params.SIGN_CODE,
            STUDENT_ID: params.STUDENT_ID,
          },
        }),
      );

      const token = jwt.sign(
        {
          EMAIL: result.EMAIL,
          id: result.id,
        },
        process.env.SECRET,
        {
          expiresIn: 3600 * 2, // 2 hours
        },
      );

      let response = serializer(await Student.update(
        {TOKEN: token},
        {
          where: {
            id: result.id,
          },
          returning: true,
        },
      ));

      if (result) return response[1][0];
    } catch (e) {
      console.error(e);
    }
  }

  async login(params) {
    try {
      const keys = ['USERNAME', 'PASSWORD'];
      const data = params;

      for (const eltKey of keys)
        if (!Object.keys(params).includes(eltKey)) {
          return {message: 'missing or incorrect parameters'};
        }

      const result: any = await this.userModel.findOne({
        include: [this.requestGroupModel, this.organizationGroupModel],
        where: {
          USERNAME: data.USERNAME,
          ACTIVATED: true,
        },
        raw: true,
      });
      if (result && bcrypt.compareSync(data.PASSWORD, result.PASSWORD)) {
        const token = jwt.sign(
          {
            PASSWORD: result.PASSWORD,
            id: result.id,
          },
          process.env.admKey,
          {
            expiresIn: 3600 * 8,
            // expiresIn: 10
          },
        );

        await this.userModel.update(
          {TOKEN: token},
          {
            where: {
              id: result.id,
            },
            returning: true,
          },
        );

        const response = await this.userModel.findOne({
          include: [this.organizationGroupModel, this.requestGroupModel],
          where: {id: result.id},
        });

        if (response && result)
          return {
            ...response,
            USERPRIVILEGE: decrypt({
              iv: result.USERPRIVILEGE.split('@')[0],
              content: result.USERPRIVILEGE.split('@')[1],
            }),
          };
      }
    } catch (e) {
      console.log(e);
    }
  }

  async loginStudents(params) {
    try {
      const Student = this.studentModel;
      const result: any = await Student.findOne({
        where: {
          EMAIL: params.email,
          STUDENT_ID: params.matricule,
        },
        raw: true,
      });

      if (result) {
        const token: any = jwt.sign(
          {
            STUDENT_ID: result.STUDENT_ID,
            id: result.id,
          },
          process.env.revKey,
          {
            expiresIn: 3600 * 8,
          },
        );
        result.TOKEN = token;
        await Student.update(
          {TOKEN: token},
          {
            where: {
              id: result.id,
            },
            returning: true,
          },
        );
        return result;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async signInWithFederate(params) {
    try {
      const result = await this.userModel.findOne({
        include: [
          {model: this.requestGroupModel, as: 'RequestGroup'},
          {model: this.organizationGroupModel, as: 'OrganizationGroup'},
        ],
        where: {
          USERNAME: params.account.username,
          ACTIVATED: true,
        },
      });

      if (result) {
        if (params.tenantId === process.env.tenantId) {
          const token = jwt.sign({id: result.id}, process.env.apiGKey, {
            expiresIn: 3600 * 8,
          });

          const updatedNum = await this.userModel.update(
            {TOKEN: token, USERFULLNAME: params.account.name},
            {
              where: {id: result.id},
              returning: true,
            },
          );

          if (updatedNum[0] > 0) {
            const data = serializer(
              await this.userModel.findOne({
                include: [
                  {
                    model: this.requestGroupModel,
                    as: 'RequestGroup',
                  },
                  {
                    model: this.organizationGroupModel,
                    as: 'OrganizationGroup',
                  },
                ],
                where: {id: result.id},
              }),
            );

            return {
              ...data,
              USERPRIVILEGE: decrypt({
                iv: result.USERPRIVILEGE.split('@')[0],
                content: result.USERPRIVILEGE.split('@')[1],
              }),
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
