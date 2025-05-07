import { Column, DataType, Index, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'ACADEMIC_YEARS' })
export class AcademicYears extends Model {
  @PrimaryKey @Column({ type: DataType.INTEGER, autoIncrement: true }) id: number;
  @Column({ type: DataType.STRING }) YEAR_ID: string;

  @Column({ type: DataType.STRING }) YEAR_NAME: string;

  @Column({ type: DataType.INTEGER }) COUNT_TOTAL_STUDENT: number;

  @Column({ type: DataType.INTEGER }) COUNT_FEMALE_STUDENT: number;

  @Column({ type: DataType.INTEGER }) COUNT_MALE_STUDENT: number;

  @Column({ type: DataType.BOOLEAN }) ACTIVATED: boolean;
}
