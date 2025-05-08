import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Subjects } from '../subjects/subjects';

@Table({ tableName: 'EMPLOYEE_SUBJECTS' })
export class EmployeeSubjects extends Model {
  @Column({ type: DataType.STRING }) EMPLOYEE_ID: string;
  @Column({ type: DataType.STRING }) SUBJECT_ID: string;
  @Column({ type: DataType.STRING }) SUBJECT_ABREVIATION_CLASS: string;
  @Column({ type: DataType.STRING }) CLASS_ID: string;
  @Column({ type: DataType.STRING }) SCHOOL_ID: string;
  @Column({ type: DataType.STRING }) YEAR_NAME: string;
  @Column({ type: DataType.DATE }) YEAR_START: Date;
  @Column({ type: DataType.DATE }) YEAR_END: Date;
  @Column({ type: DataType.INTEGER }) LEVEL_ID: bigint;
  @Column({ type: DataType.INTEGER }) YEAR_ID: bigint;
  @Column({ type: DataType.INTEGER }) SUBJECT_PERIOD_POSITION: bigint;
  @Column({ type: DataType.STRING }) SUBJECT_STATUS: string;

  @BelongsTo(() => Subjects, { foreignKey: 'SUBJECT_ID', targetKey: 'SUBJECT_ID', as: 'Subject' })
  subject: Subjects;

}
