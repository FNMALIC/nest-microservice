import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export enum GroupStatus {
  G_GROUP = 1, // Assign meaningful numbers to statuses
  G_HYBRID = 2,
}

@Table({ tableName: 'ORGANIZATION_GROUPS' })
export class OrganizationGroups extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;
  @Column({ type: DataType.STRING }) ORGA_GROUP_ID: string;
  @Column({ type: DataType.STRING }) ORGA_GROUP_NAME: string;
  @Column({ type: DataType.STRING }) ORGA_GROUP_PARENT_ID: string;
  @Column({ type: DataType.INTEGER }) ORGA_GROUP_LEVEL: number;
  @Column({ type: DataType.INTEGER }) ORGA_GROUP_STATUS: GroupStatus;
  @Column({ type: DataType.INTEGER }) IS_ACADEMIC_GROUP: number;
  @Column({ type: DataType.STRING }) ORGA_SUBJECT_CODE: string;
}
