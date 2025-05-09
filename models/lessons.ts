import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'LESSONS' })
export class Lessons extends Model {
  @Column({ type: DataType.STRING }) Bill_Last_Change_Date: string;
  @Column({ type: DataType.STRING }) Building_ID: string;
  @Column({ type: DataType.STRING }) Building_Last_Change_Date: string;
  @Column({ type: DataType.STRING }) Building_Name: string;
  @Column({ type: DataType.STRING }) Campus_ID: string;
  @Column({ type: DataType.STRING }) Campus_Last_Change_Date: string;
  @Column({ type: DataType.STRING }) Campus_Name: string;
  @Column({ type: DataType.STRING }) Class_ID: string;
  @Column({ type: DataType.STRING }) Class_Last_Change_Date: string;
  @Column({ type: DataType.STRING }) Class_Name: string;
  @Column({ type: DataType.STRING }) Lesson_Begin_Time: string;
  @Column({ type: DataType.DATEONLY }) Lesson_Date: string;
  @Column({ type: DataType.STRING }) Lesson_End_Time: string;
  @Column({ type: DataType.STRING }) Lesson_ID: string;
  @Column({ type: DataType.STRING }) Lesson_Last_Change_Date: string;
  @Column({ type: DataType.STRING }) Lesson_Status: string;
  @Column({ type: DataType.STRING }) Lesson_Type_Billed: string;
  @Column({ type: DataType.STRING }) Lesson_Type_Planned: string;
  @Column({ type: DataType.STRING }) Lesson_Type_Validated: string;
  @Column({ type: DataType.STRING }) Room_ID: string;
  @Column({ type: DataType.STRING }) Room_Last_Change_Date: string;
  @Column({ type: DataType.STRING }) Room_Name: string;
  @Column({ type: DataType.STRING }) School_Guid: string;
  @Column({ type: DataType.STRING }) School_Last_Change_Date: string;
  @Column({ type: DataType.STRING }) Speciality_ID: string;
  @Column({ type: DataType.STRING }) Speciality_Last_Change_Date: string;
  @Column({ type: DataType.STRING }) Speciality_Name: string;
  @Column({ type: DataType.STRING }) Subject_Abreviation: string;
  @Column({ type: DataType.STRING }) Subject_Guid: string;
  @Column({ type: DataType.STRING }) Subject_ID: string;
  @Column({ type: DataType.STRING }) Subject_Last_Change_Date: string;
  @Column({ type: DataType.STRING }) Subject_Name: string;
  @Column({ type: DataType.STRING }) Subject_VH_AB_Initial: string;
  @Column({ type: DataType.STRING }) Subject_VH_CM_Initial: string;
  @Column({ type: DataType.STRING }) Subject_VH_EX_Initial: string;
  @Column({ type: DataType.STRING }) Subject_VH_Last_Change_Date: string;
  @Column({ type: DataType.STRING }) Subject_VH_MT_Initial: string;
  @Column({ type: DataType.STRING }) Subject_VH_TD_Initial: string;
  @Column({ type: DataType.STRING }) Subject_VH_TP_Initial: string;
  @Column({ type: DataType.STRING }) Teacher_Last_Change_Date: string;
  @Column({ type: DataType.STRING }) Teacher_ID: string;
  @Column({ type: DataType.STRING }) Teacher_Status: string;
  @Column({ type: DataType.STRING }) Year_Guid: string;
  @Column({ type: DataType.STRING }) Year_Last_Change_Date: string;
  @Column({ type: DataType.STRING }) Year_Name: string;
}
