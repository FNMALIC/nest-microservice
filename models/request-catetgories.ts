import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'REQUESTS_CATEGORIES' })
export class RequestCategories extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;
  @Column({ type: DataType.STRING }) ID_CAT: string;
  @Column({ type: DataType.STRING }) ID_SCAT: string;
  @Column({ type: DataType.STRING }) CATEGORIE: string;
  @Column({ type: DataType.STRING }) CATEGORIE_EN: string;
  @Column({ type: DataType.STRING }) S_CATEGORIE: string;
  @Column({ type: DataType.STRING }) S_CATEGORIE_EN: string;
  @Column({ type: DataType.STRING }) CAT_DESCRIPTION_EN: string;
  @Column({ type: DataType.STRING }) CAT_DESCRIPTION: string;
  @Column({ type: DataType.STRING }) SCAT_DESCRIPTION: string;
  @Column({ type: DataType.STRING }) SCAT_DESCRIPTION_EN: string;
}
