import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import {RequestStepConfigs} from "./request-step-configs";
import {Requests} from "./requests";
import {LabelDecisions} from "./label-decisions";

@Table({ tableName: 'REQUEST_STEPS' })
export class RequestSteps extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;
  @ForeignKey(() => Requests)
  @Column({ type: DataType.STRING })
  REQUEST_ID: string;

  @Column({ type: DataType.STRING }) RSTEPCONFIG_ID: string;
  @Column({ type: DataType.STRING }) RSTEP_DECISION: string;
  @Column({ type: DataType.STRING }) RSTEP_COMM: string;
  @Column({ type: DataType.STRING }) RSTEP_STATUS: string;
  @Column({ type: DataType.STRING }) RSTEP_ESCALADE: string;
  @Column({ type: DataType.DATE }) RSTEP_TIME: Date;

  @BelongsTo(() => Requests)
  requestAuthor: Requests;

  @BelongsTo(() => RequestStepConfigs, {
    foreignKey: 'RSTEPCONFIG_ID',
    targetKey: 'RSTEP_ID',
    as: 'RequestStepConfig',
  })
  @BelongsTo(() => LabelDecisions, {
    foreignKey: 'RSTEP_DECISION',
    targetKey: 'id',
    as: 'LabelDecision',
  })
  LabelDecision:LabelDecisions
}
