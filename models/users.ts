import {
  BelongsTo,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import {RequestGroups} from "./request-groups";
import {OrganizationGroups} from "./organization-groups";

@Table({ tableName: 'USERS' })
export class Users extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;
  @Column({ type: DataType.STRING }) USERNAME: string;
  @Column({ type: DataType.STRING }) USERFULLNAME: string;
  @Column({ type: DataType.STRING }) USERPROFILE: string;
  @Column({ type: DataType.STRING }) USERPRIVILEGE: string;
  @Column({ type: DataType.STRING }) ACTIVATED: string;
  @Column({ type: DataType.STRING }) TOKEN: string;
  @Column({ type: DataType.STRING }) ORGANIZATION_EMAIL: string;
  @Column({ type: DataType.STRING }) ORGANIZATION_GROUP: string;
  @Column({ type: DataType.STRING }) REQUEST_GROUP_ID: string;

  @BelongsTo(() => RequestGroups, {
    foreignKey: 'REQUEST_GROUP_ID',
    targetKey: 'REQUEST_GROUP_ID',
    as: 'RequestGroup',
  })
  requestGroup: RequestGroups;

  @BelongsTo(() => OrganizationGroups, {
    foreignKey: 'ORGANIZATION_GROUP',
    targetKey: 'id',
    as: 'OrganizationGroup',
  })
  organizationGroup: OrganizationGroups;
}
