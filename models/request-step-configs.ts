import { BelongsTo, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { RequestCategories } from './request-catetgories';
import { RequestGroups } from './request-groups';

@Table({ tableName: 'REQUEST_STEP_CONFIGS' })
export class RequestStepConfigs extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  RSTEP_ID: string;

  @Column({ type: DataType.STRING })
  RSTEP_CAT_ID: string;

  @Column({ type: DataType.STRING })
  RSTEP_UNITY_ID: string;

  @Column({ type: DataType.STRING })
  RSTEP_DEST_ID: string;

  @Column({ type: DataType.STRING })
  RSTEP_DELAY_O: string;

  @Column({ type: DataType.STRING })
  RSTEP_STATUS_O: string;

  @Column({ type: DataType.STRING })
  RSTEP_DELAY_W: string;

  @Column({ type: DataType.STRING })
  RSTEP_STATUS_W: string;

  @Column({ type: DataType.STRING })
  RSTEP_DELAY_L: string;

  @Column({ type: DataType.STRING })
  RSTEP_STATUS_L: string;

  @BelongsTo(() => RequestCategories, {
    foreignKey: 'RSTEP_CAT_ID',
    targetKey: 'ID_SCAT',
    as: 'RequestCategory',
  }) RequestCategory: RequestCategories;

  @BelongsTo(() => RequestGroups, {
    foreignKey: 'RSTEP_DEST_ID',
    targetKey: 'REQUEST_GROUP_ID',
    as: 'RequestGroup',
  }) RequestGroup: RequestGroups;
}
