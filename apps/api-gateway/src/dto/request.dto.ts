import { ApiProperty } from '@nestjs/swagger';

export class RequestDto {
  @ApiProperty()
  REQUEST_ID: string;

  @ApiProperty()
  REQUEST_CATEGORY_ID: string;

  @ApiProperty()
  CLASS_ID: string;

  @ApiProperty()
  SUBJECT_ID: string;

  @ApiProperty()
  REQUEST_AUTHOR: string;

  @ApiProperty()
  CONTRACT_NUMBER: string;

  @ApiProperty()
  YEAR_ID: string;

  @ApiProperty()
  TH_DISPLAYED: number;

  @ApiProperty()
  TH_EXPECTED: number;

  @ApiProperty()
  VH_DISPLAYED: number;

  @ApiProperty()
  VH_EXPECTED: number;

  @ApiProperty()
  TI_DISPLAYED: number;

  @ApiProperty()
  TI_EXPECTED: number;

  @ApiProperty()
  AMOUNT_RECEIVED: number;

  @ApiProperty()
  REQUEST_PBLM_DATE: Date;

  @ApiProperty()
  REQUEST_PBLM_WEEK: string;

  @ApiProperty()
  REQUEST_STATUS: string;

  @ApiProperty()
 REQUEST_FILE: string;

 @ApiProperty()
 REQUEST_ESCALADE: number;

 @ApiProperty()
 REQUEST_OBJECT: string;

 @ApiProperty()
 AMOUNT_EXPECTED: number;

 @ApiProperty()
 DESCRIPTION: string;

 @ApiProperty()
 REQUEST_UNITY_ID: string;

 @ApiProperty()
 REPRO_STUDENT_COUNT: number;

 @ApiProperty()
 REPRO_COPY_NUMBER: number;

 @ApiProperty()
 REQUEST_UNITY_TRANSMISSIBLE: boolean;

 @ApiProperty()
 PRINTED: boolean;

 @ApiProperty()
 REQUEST_PBLM_HOUR_START: string;

 @ApiProperty()
 REQUEST_PBLM_HOUR_END: string;

}


export class CreateRequestDto {
  @ApiProperty({ example: 'REQ123' })
  REQUEST_ID: string;

  @ApiProperty({ example: 'CAT001' })
  REQUEST_CATEGORY_ID: string;

  @ApiProperty({ example: 'CLS001' })
  CLASS_ID: string;

  @ApiProperty({ example: 'SUB001' })
  SUBJECT_ID: string;

  @ApiProperty({ example: 'EMP123' })
  REQUEST_AUTHOR: string;

  @ApiProperty({ example: 'CNT456' })
  CONTRACT_NUMBER: string;

  @ApiProperty({ example: '2024' })
  YEAR_ID: string;

  @ApiProperty({ example: 10.5 })
  TH_DISPLAYED: number;

  @ApiProperty({ example: 12.0 })
  TH_EXPECTED: number;

  @ApiProperty({ example: 30 })
  VH_DISPLAYED: number;

  @ApiProperty({ example: 40 })
  VH_EXPECTED: number;

  @ApiProperty({ example: 5.25 })
  TI_DISPLAYED: number;

  @ApiProperty({ example: 6.0 })
  TI_EXPECTED: number;

  @ApiProperty({ example: 1500.75 })
  AMOUNT_RECEIVED: number;

  @ApiProperty({ example: '2024-05-08T00:00:00.000Z' })
  REQUEST_PBLM_DATE: Date;

  @ApiProperty({ example: 'Week 15' })
  REQUEST_PBLM_WEEK: string;

  @ApiProperty({ example: 'PENDING' })
  REQUEST_STATUS: string;

  @ApiProperty({ example: 'file.pdf' })
  REQUEST_FILE: string;

  @ApiProperty({ example: 1 })
  REQUEST_ESCALADE: number;

  @ApiProperty({ example: 'Exam paper printing' })
  REQUEST_OBJECT: string;

  @ApiProperty({ example: 2000.0 })
  AMOUNT_EXPECTED: number;

  @ApiProperty({ example: 'Print request for midterms' })
  DESCRIPTION: string;

  @ApiProperty({ example: 'UNI001' })
  REQUEST_UNITY_ID: string;

  @ApiProperty({ example: 50 })
  REPRO_STUDENT_COUNT: number;

  @ApiProperty({ example: 2 })
  REPRO_COPY_NUMBER: number;

  @ApiProperty({ example: true })
  REQUEST_UNITY_TRANSMISSIBLE: boolean;

  @ApiProperty({ example: false })
  PRINTED: boolean;

  @ApiProperty({ example: '08:00:00' })
  REQUEST_PBLM_HOUR_START: string;

  @ApiProperty({ example: '10:00:00' })
  REQUEST_PBLM_HOUR_END: string;
}
