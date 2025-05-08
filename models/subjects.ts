import { Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import {EmployeeSubjects} from "./employee-subjects";
// import {ApplicationChoices} from "./application-choices";

@Table({ tableName: 'SUBJECTS' })
export class Subjects extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;
  @Column({ type: DataType.STRING }) SUBJECT_ID: string;
  @Column({ type: DataType.STRING }) CLASS_ID: string;
  @Column({ type: DataType.STRING }) LEVEL_ID: string;
  @Column({ type: DataType.STRING }) YEAR_ID: string;
  @Column({ type: DataType.STRING }) SUBJECT_NAME: string;
  @Column({ type: DataType.STRING }) SUBJECT_SHORTNAME: string;
  @Column({ type: DataType.STRING }) SUBJECT_STATUS: string;
  @Column({ type: DataType.STRING }) SUBJECT_ABREVIATION: string;
  @Column({ type: DataType.INTEGER }) SUBJECT_VH_AB_INITIAL: bigint;
  @Column({ type: DataType.INTEGER }) SUBJECT_VH_CM_INITIAL: bigint;
  @Column({ type: DataType.INTEGER }) SUBJECT_VH_EX_INITIAL: bigint;
  @Column({ type: DataType.INTEGER }) SUBJECT_VH_TD_INITIAL: bigint;
  @Column({ type: DataType.INTEGER }) SUBJECT_VH_MT_INITIAL: bigint;
  @Column({ type: DataType.INTEGER }) SUBJECT_VH_TP_INITIAL: bigint;
  @Column({ type: DataType.INTEGER }) RECURENCE: bigint;

  @HasMany(() => EmployeeSubjects, {
    foreignKey: 'SUBJECT_ID',
    sourceKey: 'SUBJECT_ID',
  }) EmployeeSubject: EmployeeSubjects[];

  // @HasMany(() => ApplicationChoices, {
  //   foreignKey: 'SUBJECT_ID',
  //   sourceKey: 'SUBJECT_ID',
  //   as: 'SubjectChoices',
  // }) SubjectChoices: ApplicationChoices[];
}
