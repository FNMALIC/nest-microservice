import {
  BelongsTo,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { RequestBatches } from '../request-batchs/request-batchs';

@Table({ tableName: 'REQUEST_STEP_BATCHES' })
export class RequestStepBatches extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  REQUEST_ID: string;

  @Column({ type: DataType.STRING })
  RBATCH_ID: string;

  @Column({ type: DataType.STRING })
  REQUEST_DEST_ID: string;

  @BelongsTo(() => RequestBatches, {
    foreignKey: 'RBATCH_ID',
    targetKey: 'RBATCH_ID',
    as: 'RequestBatch',
  })
  RequestBatch: RequestBatches;
}
