import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import {RequestCategories} from "./request-catetgories";
import {Employees} from "./employees";
import {RequestStepBatches} from "./request-step-batchs";
import {RequestSteps} from "./request-steps";

@Table({ tableName: 'REQUESTS' })
export class Requests extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  REQUEST_ID: string;

  @ForeignKey(() => RequestCategories)
  @Column({ type: DataType.STRING })
  REQUEST_CATEGORY_ID: string;

  @Column({ type: DataType.STRING })
  CLASS_ID: string;

  @Column({ type: DataType.STRING })
  SUBJECT_ID: string;

  @ForeignKey(() => Employees)
  @Column({ type: DataType.STRING })
  REQUEST_AUTHOR: string;

  @Column({ type: DataType.STRING })
  CONTRACT_NUMBER: string;

  @Column({ type: DataType.STRING })
  YEAR_ID: string;

  @Column({ type: DataType.REAL })
  TH_DISPLAYED: number;

  @Column({ type: DataType.REAL })
  TH_EXPECTED: number;

  @Column({ type: DataType.INTEGER })
  VH_DISPLAYED: number;

  @Column({ type: DataType.INTEGER })
  VH_EXPECTED: number;

  @Column({ type: DataType.REAL })
  TI_DISPLAYED: number;

  @Column({ type: DataType.REAL })
  TI_EXPECTED: number;

  @Column({ type: DataType.REAL })
  AMOUNT_RECEIVED: number;

  @Column({ type: DataType.DATE })
  REQUEST_PBLM_DATE: Date;

  @Column({ type: DataType.STRING })
  REQUEST_PBLM_WEEK: string;

  @Column({ type: DataType.STRING })
  REQUEST_STATUS: string;

  @Column({ type: DataType.STRING })
  REQUEST_FILE: string;

  @Column({ type: DataType.TINYINT })
  REQUEST_ESCALADE: number;

  @Column({ type: DataType.STRING })
  REQUEST_OBJECT: string;

  @Column({ type: DataType.REAL })
  AMOUNT_EXPECTED: number;

  @Column({ type: DataType.STRING })
  DESCRIPTION: string;

  @Column({ type: DataType.STRING })
  REQUEST_UNITY_ID: string;

  @Column({ type: DataType.INTEGER })
  REPRO_STUDENT_COUNT: number;

  @Column({ type: DataType.INTEGER })
  REPRO_COPY_NUMBER: number;

  @Column({ type: DataType.BOOLEAN })
  REQUEST_UNITY_TRANSMISSIBLE: boolean;

  @Column({ type: DataType.BOOLEAN })
  PRINTED: boolean;

  @Column({ type: DataType.TIME })
  REQUEST_PBLM_HOUR_START: string;

  @Column({ type: DataType.TIME })
  REQUEST_PBLM_HOUR_END: string;

  // Relationships
  @BelongsTo(() => RequestCategories, {
    foreignKey: 'REQUEST_CATEGORY_ID',
    targetKey: 'ID_SCAT',
    as: 'RequestCategory',
  })
  RequestCategory: RequestCategories;

  @BelongsTo(() => Employees, {
    foreignKey: 'REQUEST_AUTHOR',
    targetKey: 'EMPLOYEE_ID',
    as: 'Employee',
  })
  Employee: Employees;

  @BelongsTo(() => RequestStepBatches, {
    foreignKey: 'REQUEST_ID',
    targetKey: 'REQUEST_ID',
    as: 'RequestStepBatch',
  })
  RequestStepBatch: RequestStepBatches;

  @BelongsTo(() => RequestSteps, {
    foreignKey: 'REQUEST_ID',
    targetKey: 'REQUEST_ID',
  }) RequestStep: RequestSteps;
}
