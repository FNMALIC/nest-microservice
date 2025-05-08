import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'PAYMENT_NETWORKS' })
export default class PaymentNetworks extends Model {

  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;
  @Column({ type: DataType.STRING })
  scope: string;
  @Column({ type: DataType.STRING })
  caption: string;
  @Column({ type: DataType.STRING })
  name: string;
  @Column({ type: DataType.STRING })
  country: string;
  @Column({ type: DataType.STRING })
  proxy: string;
  @Column({ type: DataType.STRING })
  color: string;
  @Column({ type: DataType.STRING })
  type: string;
  @Column({ type: DataType.STRING })
  currency: string;
  @Column({ type: DataType.BIGINT })
  request_payment_min_amount: number;
  @Column({ type: DataType.BIGINT })
  request_payment_max_amount: number;
  @Column({ type: DataType.BIGINT })
  request_deposit_min_amount: number;
  @Column({ type: DataType.BIGINT })
  request_deposit_max_amount: number;
  @Column({ type: DataType.STRING })
  ussd_code: string;
  @Column({ type: DataType.STRING })
  mobile_app_name: string;
  @Column({ type: DataType.STRING })
  allowed_prefixes: string;
  @Column({ type: DataType.STRING })
  allowed_suffixes: string;
  @Column({ type: DataType.STRING })
  user_help: string;
  @Column({ type: DataType.STRING })
  technical_help: string;
  @Column({ type: DataType.STRING })
  is_local_request: boolean;
}