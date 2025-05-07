import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'REQUEST_DISPLAY_CONFIGS' })
export class RequestDisplayConfigs extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;
  @Column({ type: DataType.STRING }) REQUEST_CATEGORY_ID: string;
  @Column({ type: DataType.STRING }) CLASS_ID: string;
  @Column({ type: DataType.STRING }) SUBJECT_ID: string;
  @Column({ type: DataType.STRING }) CONTRACT_NUMBER: string;
  @Column({ type: DataType.STRING }) REQUEST_PBLM_WEEK: string;
  @Column({ type: DataType.STRING }) REQUEST_PBLM_DATE: string;
  @Column({ type: DataType.STRING }) TH_DISPLAYED: string;
  @Column({ type: DataType.STRING }) TH_EXPECTED: string;
  @Column({ type: DataType.STRING }) VH_DISPLAYED: string;
  @Column({ type: DataType.STRING }) VH_EXPECTED: string;
  @Column({ type: DataType.STRING }) TI_DISPLAYED: string;
  @Column({ type: DataType.STRING }) TI_EXPECTED: string;
  @Column({ type: DataType.STRING }) AMOUNT_RECEIVED: string;
  @Column({ type: DataType.STRING }) REPRO_COPY_NUMBER: string;
  @Column({ type: DataType.STRING }) REPRO_STUDENT_COUNT: string;
  @Column({ type: DataType.STRING }) AMOUNT_EXPECTED: string;
  @Column({ type: DataType.STRING }) DESCRIPTION: string;
  @Column({ type: DataType.STRING }) TIME_TABLE: string;
  @Column({ type: DataType.STRING }) EVENT_DAY: string;
  @Column({ type: DataType.STRING }) EVENT_HOUR: string;
  @Column({ type: DataType.STRING }) FILE: string;
}
