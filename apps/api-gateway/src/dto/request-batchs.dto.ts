import { ApiProperty } from '@nestjs/swagger';

export class RequestbatchsDto {
  @ApiProperty()
  RBATCH_ID: string;

  @ApiProperty()
  RBATCH_UNREAD: boolean;

  @ApiProperty()
  DEST_ID: string;

  @ApiProperty()
  SENDER_ID: string;

  @ApiProperty()
  PRINTED: string;

  @ApiProperty()
  TRANSMITTED: string;

  @ApiProperty()
  YEAR_ID: string;
}

export class CreateRequestBatchsDto {
    @ApiProperty()
    RBATCH_ID: string;
  
    @ApiProperty()
    RBATCH_UNREAD: boolean;
  
    @ApiProperty()
    DEST_ID: string;
  
    @ApiProperty()
    SENDER_ID: string;
  
    @ApiProperty()
    PRINTED: string;
  
    @ApiProperty()
    TRANSMITTED: string;
  
    @ApiProperty()
    YEAR_ID: string;
}