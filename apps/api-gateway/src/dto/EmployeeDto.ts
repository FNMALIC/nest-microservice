import {ApiProperty, OmitType, PartialType} from "@nestjs/swagger";

export class EmployeeDto {
  @ApiProperty({example: ''})
  matricule: string;
  @ApiProperty({example: ''})
  email: string;
}

// export class CreateUserDto extends PartialType(
//   OmitType(UserDto, ['id'] as const)
// ) {}