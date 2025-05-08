import { Injectable } from '@nestjs/common';
import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Injectable()
@Table({ tableName: 'SPECIALITIES' })
export class Specialities extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;
  @Column({ type: DataType.STRING })
  SPECIALITY_ID: string;
  @Column({ type: DataType.STRING })
  SPECIALITY_GUID: string;
  @Column({ type: DataType.STRING })
  SPECIALITY_NAME: string;
  @Column({ type: DataType.STRING })
  SPECIALITY_DESCRIPTION: string;
  @Column({ type: DataType.STRING })
  SPECIALITY_MIN_LEVEL_ID: string;
  @Column({ type: DataType.STRING })
  SPECIALITY_MIN_LEVEL_NAME: string;
  @Column({ type: DataType.INTEGER })
  SPECIALITY_MAX_LEVEL_ID: number;
  @Column({ type: DataType.INTEGER })
  SPECIALITY_MAX_LEVEL_NAME: number;
  @Column({ type: DataType.STRING })
  MINISTRY_ID: string;
  @Column({ type: DataType.STRING })
  CYCLE_ID: string;
  @Column({ type: DataType.STRING })
  CYCLE_GUID: string;
  @Column({ type: DataType.STRING })
  CYCLE_NAME: string;
  @Column({ type: DataType.STRING })
  CYCLE_POSITION: string;
  @Column({ type: DataType.TEXT })
  SPECIALITY_HTML_ONLINE_DESCRIPTION: string;
  @Column({ type: DataType.TEXT })
  SPECIALITY_HTML_ONLINE_OBJECTIF: string;
  @Column({ type: DataType.TEXT })
  SPECIALITY_HTML_ONLINE_DEBOUCHES: string;
  @Column({ type: DataType.TEXT })
  SPECIALITY_HTML_ONLINE_DOSSIER_CANDIDATURE: string;
}