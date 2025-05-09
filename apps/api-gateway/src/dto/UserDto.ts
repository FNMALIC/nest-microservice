import {ApiProperty, OmitType, PartialType} from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({example: ''})
  username: string;
  @ApiProperty({example: [], isArray: true, type: String})
  privilege: string[];
  @ApiProperty({example: ''})
  profile: string;
  @ApiProperty({example: ''})
  group: string;
  @ApiProperty({example: ''})
  orgaGroup: number;
  @ApiProperty({example: ''})
  id: number;
}

export class CreateUserDto extends PartialType(
  OmitType(UserDto, ['id'] as const)
) {}