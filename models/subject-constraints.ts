import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({tableName: 'SUBJECT_CONSTRAINTS'})
export class SubjectConstraints extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true }) id: number;
  @Column({ type: DataType.INTEGER }) SUBJECT_CONS_TYPES_ID: bigint;
}
