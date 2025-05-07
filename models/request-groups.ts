import {Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';

export enum GroupManager {
  G_GROUP = 1, // Assign meaningful numbers to statuses
  G_HYBRID = 2,
}

@Table({tableName: 'REQUEST_GROUPS'})
export class RequestGroups extends Model {
  @PrimaryKey
  @Column({type: DataType.INTEGER, autoIncrement: true})
  id: number;
  @Column({type: DataType.STRING}) REQUEST_GROUP_ID: string;
  @Column({type: DataType.STRING}) REQ_GROUP_NAME: string;
  @Column({type: DataType.STRING}) REQ_GROUP_CONFIG_PART: string;
  @Column({type: DataType.INTEGER}) REQ_GROUP_MANAGER: GroupManager;
  @Column({type: DataType.INTEGER}) REQ_GROUP_CLOSE_RIGHT: number;
}
