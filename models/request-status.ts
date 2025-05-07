import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'REQUEST_STATS' })
export class RequestStatus extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;
  @Column({ type: DataType.STRING }) REQ_STATUS_ID: string;
  @Column({ type: DataType.STRING }) REQ_STATUS_CODE: string;
  @Column({ type: DataType.STRING }) REQ_STATUS_LABEL: string;
}
