import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'LABEL_DECISIONS' })
export class LabelDecisions extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;
  @Column({ type: DataType.STRING }) LIBELLE: string;
  @Column({ type: DataType.STRING }) LIB_UNITY_ID: string;
  @Column({ type: DataType.STRING }) LIB_DEST_ID: string;
  @Column({ type: DataType.STRING }) REQ_STATUS_ID: string;
}
