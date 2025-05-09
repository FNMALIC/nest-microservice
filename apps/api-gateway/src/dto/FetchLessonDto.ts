import {ApiProperty} from "@nestjs/swagger";

export class FetchLessonDto {
  @ApiProperty({example: ''})
  EMPLOYEE_ID: string;
  @ApiProperty({example: '2025-04-01'})
  START_DATE: string;
  @ApiProperty({example: '2025-04-15'})
  END_DATE: string;
}

