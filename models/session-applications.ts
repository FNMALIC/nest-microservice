import { BelongsTo, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import {SubjectConstraints} from "./subject-constraints";

@Table({ tableName: 'SESSION_APPLICATIONS' })
export class SessionApplications extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true }) id: number;
  @Column({ type: DataType.STRING }) ACADEMIC_YEAR: string;
  @Column({ type: DataType.DATE }) START_DATE: Date;
  @Column({ type: DataType.DATE }) END_DATE: Date;
  @Column({ type: DataType.BOOLEAN, defaultValue: 1 }) MANUAL_CLOSURE: boolean;
  @Column({ type: DataType.STRING }) DESIGNATION: string;
  @Column({ type: DataType.INTEGER, defaultValue: 1 }) SUBJECT_CONSTRAINT_ID: bigint;
  @Column({ type: DataType.BOOLEAN, defaultValue: 1 }) ACTIVATED: boolean;

  @BelongsTo(() => SubjectConstraints, {
    foreignKey: 'SUBJECT_CONSTRAINT_ID',
    targetKey: 'id',
    as: 'SubjectConstraint',
  }) subjectConstraints: SubjectConstraints;
}
