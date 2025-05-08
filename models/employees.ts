import { Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import {EmployeeSubjects} from "./employee-subjects";

@Table({ tableName: 'EMPLOYEES' })
export class Employees extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING })
  EMPLOYEE_ID: string;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  ACTIVATED: boolean;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  ACCESS_COURSES: boolean;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  RHVALID: boolean;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  EMAIL_VERIFIED: boolean;

  @Column({ type: DataType.STRING })
  FIRSTNAME: string;

  @Column({ type: DataType.STRING })
  LASTNAME: string;

  @Column({ type: DataType.STRING })
  STATUS: string;

  @Column({ type: DataType.STRING })
  DENOMINATION: string;

  @Column({ type: DataType.STRING(2) })
  GENDER: string;

  @Column({ type: DataType.DATEONLY })
  BIRTHDATE: Date;

  @Column({ type: DataType.STRING })
  BIRTHPLACE: string;

  @Column({ type: DataType.STRING })
  COUNTRY: string;

  @Column({ type: DataType.STRING })
  TOWN: string;

  @Column({ type: DataType.STRING })
  DISTRICT: string;

  @Column({ type: DataType.STRING })
  PRECINCT: string;

  @Column({ type: DataType.STRING })
  EMAIL: string;

  @Column({ type: DataType.STRING })
  NUMPHONE: string;

  @Column({ type: DataType.STRING })
  NUMPHONE2: string;

  @Column({ type: DataType.STRING })
  CIVIL_STATUS: string;

  @Column({ type: DataType.STRING })
  SPFIRSTNAME: string;

  @Column({ type: DataType.STRING })
  SPLASTNAME: string;

  @Column({ type: DataType.DATEONLY })
  SPBIRTHDATE: Date;

  @Default(0)
  @Column({ type: DataType.INTEGER })
  CHILDNUM: number;

  @Column({ type: DataType.STRING })
  EMERGNAME1: string;

  @Column({ type: DataType.STRING })
  EMERGNUM1: string;

  @Column({ type: DataType.STRING })
  LECTURER: string;

  @Column({ type: DataType.INTEGER })
  LASTDIPLOMA: number;

  @Column({ type: DataType.STRING })
  LASTJOB: string;

  @Column({ type: DataType.STRING })
  LASTEMPLOYER: string;

  @Column({ type: DataType.DATEONLY })
  LASTJOBSTART: string;

  @Column({ type: DataType.DATEONLY })
  LASTJOBEND: string;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  LASTJOBSTILL: boolean;

  @Column({ type: DataType.STRING })
  IDENTIFICATION: string;

  @Column({ type: DataType.STRING })
  IDENTIFNUM: string;

  @Column({ type: DataType.STRING })
  IDENTIFPLACE: string;

  @Column({ type: DataType.DATEONLY })
  IDENTIFSTART: string;

  @Column({ type: DataType.DATEONLY })
  IDENTIFEND: string;

  @Column({ type: DataType.STRING })
  NIU: string;

  @Column({ type: DataType.STRING })
  CNPSYN: string;

  @Column({ type: DataType.STRING })
  CNPSNUM: string;

  @Column({ type: DataType.STRING })
  GMAIL_ACCOUNT: string;

  @Column({ type: DataType.STRING })
  PAYMODE: string;

  @Column({ type: DataType.STRING })
  EMAIL_VERIFICATION_TOKEN: string;

  @Column({ type: DataType.STRING })
  TOKEN: string;

  @Column({ type: DataType.STRING })
  ACCOUNT_NUM: string;

  @Column({ type: DataType.STRING })
  ACCOUNT_LASTNAME: string;

  @Column({ type: DataType.STRING })
  ACCOUNT_FIRSTNAME: string;

  @Column({ type: DataType.DATEONLY })
  ACCOUNT_BIRTHDATE: Date;

  @Column({ type: DataType.STRING })
  IDENTITY1: string;

  @Column({ type: DataType.STRING })
  IDENTITY2: string;

  @Column({ type: DataType.STRING })
  ACTIVITY_PRINCIPAL: string;

  @Column({ type: DataType.STRING })
  STATUS_MESSAGE: string;

  @Column({ type: DataType.STRING })
  RIB_LINK: string;

  @Column({ type: DataType.STRING })
  NIU_LINK: string;

  @Column({ type: DataType.STRING })
  CNPS_LINK: string;

  @Column({ type: DataType.STRING })
  CV_LINK: string;

  @Column({ type: DataType.STRING })
  MINISTERIAL_DECREE: string;

  @Column({ type: DataType.STRING })
  PRESENCE_ATTEST: string;

  @Column({ type: DataType.STRING(6) })
  SIGN_CODE: string;

  @Column({ type: DataType.STRING })
  IDENTIFICATION_PASSPORT: string;

  @Column({ type: DataType.STRING })
  IDENTIFNUM_PASSPORT: string;

  @Column({ type: DataType.STRING })
  IDENTIFPLACE_PASSPORT: string;

  @Column({ type: DataType.STRING })
  IDENTIFSTART_PASSPORT: string;

  @Column({ type: DataType.STRING })
  IDENTIFEND_PASSPORT: string;

  @Column({ type: DataType.STRING(20) })
  GRADES: string;

  @Column({ type: DataType.STRING(20) })
  TITLE: string;

  @Column({ type: DataType.STRING })
  SPECIALITY: string;

  @Column({ type: DataType.STRING })
  IDENTITY1_PASSPORT: string;

  @Column({ type: DataType.STRING })
  ORIGIN_REGION: string;

  @Column({ type: DataType.STRING })
  IDENTITY2_PASSPORT: string;

  @HasMany(() => EmployeeSubjects, {
    foreignKey: 'EMPLOYEE_ID',
    sourceKey: 'EMPLOYEE_ID',
  }) employeeSubjects: EmployeeSubjects[];
}
