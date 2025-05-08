import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'PAYMENT_FEES' })
export default class PaymentFees extends Model  {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;
  @Column({ type: DataType.STRING })
  PAYMENT_ID: string;
  @Column({ type: DataType.STRING })
  PAYMENT_GUID: string;
  @Column({ type: DataType.STRING })
  PAYMENT_RECEIPT_ID: number;
  @Column({ type: DataType.STRING })
  SCHOOL_ID: string;
  @Column({ type: DataType.STRING })
  SCHOOL_NAME: string;
  @Column({ type: DataType.STRING })
  YEAR_ID: string;
  @Column({ type: DataType.STRING })
  YEAR_NAME: string;
  @Column({ type: DataType.STRING })
  YEAR_BEGIN_DATE: string;
  @Column({ type: DataType.STRING })
  YEAR_END_DATE: string;
  @Column({ type: DataType.STRING })
  CLASS_ID: string;
  @Column({ type: DataType.STRING })
  CLASS_NAME: string;
  @Column({ type: DataType.STRING })
  STUDENT_ID_NATIONAL: number;
  @Column({ type: DataType.STRING })
  STUDENT_ID_ACADEMY: string;
  @Column({ type: DataType.STRING })
  STUDENT_ID_SCHOOL: string;
  @Column({ type: DataType.STRING })
  STUDENT_GUID: string;
  @Column({ type: DataType.STRING })
  STUDENT_FULL_NAME: string;
  @Column({ type: DataType.STRING })
  STUDENT_LAST_NAME: string;
  @Column({ type: DataType.STRING })
  STUDENT_FIRST_NAME: string;
  @Column({ type: DataType.STRING })
  STUDENT_GENDER: string;
  @Column({ type: DataType.STRING })
  STUDENT_BIRTH_DATE: string;
  @Column({ type: DataType.STRING })
  STUDENT_BIRTH_PLACE: string;
  @Column({ type: DataType.STRING })
  STUDENT_PHONE_NUMBER: string;
  @Column({ type: DataType.STRING })
  STUDENT_EMAIL: string;
  @Column({ type: DataType.STRING })
  PAYMENT_REASON_ID: string;
  @Column({ type: DataType.STRING })
  PAYMENT_REASON_NAME: string;
  @Column({ type: DataType.STRING })
  PAYMENT_DATE: string;
  @Column({ type: DataType.STRING })
  PAYMENT_AMOUNT: number;
  @Column({ type: DataType.STRING })
  PAYMENT_TYPE: string;
  @Column({ type: DataType.STRING })
  RECEIVER_ACCOUNT_ID: string;
  @Column({ type: DataType.STRING })
  RECEIVER_ACCOUNT_ABREVIATION: string;
  @Column({ type: DataType.STRING })
  RECEIVER_ACCOUNT_NAME: string;
  @Column({ type: DataType.STRING })
  RECEIVER_ACCOUNT_TYPE_ID: string;
  @Column({ type: DataType.STRING })
  PAYMENT_STATUS_NAME: string;
  @Column({ type: DataType.STRING })
  PAYMENT_STATUS_COLOR: string;
  @Column({ type: DataType.STRING })
  PAYMENT_DATE_ADD: string;
  @Column({ type: DataType.STRING })
  PAYMENT_USER_ADD: string;
  @Column({ type: DataType.STRING })
  PAYMENT_DATE_UPDATE: string;
  @Column({ type: DataType.STRING })
  PAYMENT_USER_UPDATE: string;
}
