import { BelongsTo, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import {Subjects} from "./subjects";

@Table({ tableName: 'CLASSES' })
export class Classes extends Model {
  @PrimaryKey @Column({ type: DataType.INTEGER, autoIncrement: true }) id: number;
  @Column({ type: DataType.STRING }) CLASS_ID: string;
  @Column({ type: DataType.STRING }) YEAR_ID: string;
  @Column({ type: DataType.STRING }) CLASS_NAME: string;
  @Column({ type: DataType.STRING }) SPECIALTY_ID: string;
  @Column({ type: DataType.STRING }) SPECIALTY_NAME: string;
  @Column({ type: DataType.STRING }) SPECIALTY_DESCRIPTION: string;
  @Column({ type: DataType.STRING }) LEVEL_ID: string;
  @Column({ type: DataType.STRING }) LEVEL_NAME: string;
  @Column({ type: DataType.STRING }) BRANCH_ID: string;
  @Column({ type: DataType.STRING }) BRANCH_ABREVIATION: string;
  @Column({ type: DataType.STRING }) BRANCH_NAME: string;
  @Column({ type: DataType.STRING }) CYCLE_ID: string;
  @Column({ type: DataType.STRING }) CYCLE_NAME: string;
  @Column({ type: DataType.STRING }) ORGANIZATION_GROUP_ID: string;
  @Column({ type: DataType.STRING }) CLASS_COUNT_STUDENTS_TOTAL: string;
  @Column({ type: DataType.STRING }) CLASS_COUNT_STUDENTS_FEMALE: string;
  @Column({ type: DataType.STRING }) CLASS_COUNT_STUDENTS_MALE: string;

  @BelongsTo(() => Subjects, {
    foreignKey: 'CLASS_ID',
    targetKey: 'CLASS_ID',
  }) Subject: Subjects;
}