import { BelongsTo, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ApplicationChoices } from './application-choices';
import {SessionApplications} from "./session-applications";

@Table({ tableName: 'APPLICATIONS' })
export class Applications extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;

  // Here, use a unique alias
  @HasMany(() => ApplicationChoices, {
    foreignKey: 'APPLICATION_ID',
    sourceKey: 'id',
    as: 'choices',
  })
  ApplicationChoices: ApplicationChoices[];

  @BelongsTo(() => SessionApplications, {
    foreignKey: 'SESSION_APPLICATION_ID',
    targetKey: 'id',
    as: 'SessionApplication',
  }) SessionApplication: SessionApplications;
}
