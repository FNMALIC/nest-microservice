import { BelongsTo, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Subjects } from './subjects';
import {Applications} from "./applications";

@Table({ tableName: 'APPLICATION_CHOICES' })
export class ApplicationChoices extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING }) SUBJECT_ID: string;
  @Column({ type: DataType.INTEGER }) APPLICATION_ID: number;
  @Column({ type: DataType.INTEGER }) AFFECTATION: number;
  @Column({ type: DataType.INTEGER }) SUP_AFFECTATION: number;
  @Column({ type: DataType.INTEGER }) SUP_AUTHOR: number;
  @Column({ type: DataType.STRING }) CATEGORY: string;
  @Column({ type: DataType.BOOLEAN }) CLOSURE: boolean;
  @Column({ type: DataType.BOOLEAN }) SUP_CLOSURE: boolean;
  @Column({ type: DataType.BOOLEAN }) AFFECTED_CLASS_ID: boolean;

  @BelongsTo(() => Applications, {
    foreignKey: 'APPLICATION_ID',
    targetKey: 'id',
  }) application: Applications;

  @BelongsTo(() => Subjects, {
    foreignKey: 'SUBJECT_ID',
    targetKey: 'SUBJECT_ID',
  }) Subjects: Subjects;
}
