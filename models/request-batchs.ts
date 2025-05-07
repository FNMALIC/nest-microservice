import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey, Default,
} from 'sequelize-typescript';
import * as process from 'node:process';

@Table({ tableName: 'REQUEST_BATCHES' })
export class RequestBatches extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  RBATCH_ID: string;

  @Column({ type: DataType.BOOLEAN })
  RBATCH_UNREAD: boolean;

  @Column({ type: DataType.STRING })
  DEST_ID: string;

  @Column({ type: DataType.STRING })
  SENDER_ID: string;

  @Column({ type: DataType.STRING })
  PRINTED: string;

  @Column({ type: DataType.BOOLEAN })
  TRANSMITTED: boolean;

  @Default(process.env.YEAR)
  @Column({ type: DataType.STRING})
  YEAR_ID: string;
}
