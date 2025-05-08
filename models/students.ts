import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'STUDENTS' })
export class Students extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  EMAIL: string;

  @Column({ type: DataType.STRING(20) })
  STUDENT_ID: string;

  @Column({ type: DataType.BOOLEAN })
  ACCESS_COURSES: boolean;

  @Column({ type: DataType.STRING })
  NUMPHONE: string;

  @Column({ type: DataType.STRING })
  NUMPHONE2: string;

  @Column({ type: DataType.STRING })
  REGISTRATION_ID: string;

  @Column({ type: DataType.BOOLEAN })
  EMAIL_VERIFIED: boolean;

  @Column({ type: DataType.STRING })
  EMAIL_VERIFICATION_TOKEN: string;

  @Column({ type: DataType.STRING })
  SIGN_CODE: string;

  @Column({ type: DataType.STRING })
  RELIGION: string;

  @Column({ type: DataType.STRING })
  LASTNAME: string;

  @Column({ type: DataType.STRING })
  FIRSTNAME: string;

  @Column({ type: DataType.STRING })
  GENDER: string;

  @Column({ type: DataType.STRING })
  COUNTRY: string;

  @Column({ type: DataType.STRING })
  CLASS_ID: string;

  @Column({ type: DataType.STRING })
  BIRTHDATE: string;
  @Column({ type: DataType.STRING })
  BIRTHPLACE: string;
  @Column({ type: DataType.STRING })
  EMERGNAME1: string;
  @Column({ type: DataType.STRING })
  EMERGNUM1: string;
  @Column({ type: DataType.STRING })
  TOWN: string;
  @Column({ type: DataType.STRING })
  DISTRICT: string;
  @Column({ type: DataType.STRING })
  PRECINCT: string;
  @Column({ type: DataType.STRING })
  MOTHER_CONTACT: string;
  @Column({ type: DataType.STRING })
  FATHER_NAME: string;
  @Column({ type: DataType.STRING })
  FATHER_JOB: string;
  @Column({ type: DataType.STRING })
  FATHER_BIRTH: string;
  @Column({ type: DataType.STRING })
  FATHER_CONTACT: string;
  @Column({ type: DataType.STRING })
  MOTHER_NAME: string;
  @Column({ type: DataType.STRING })
  MOTHER_JOB: string;
  @Column({ type: DataType.STRING })
  MOTHER_BIRTH: string;
}
