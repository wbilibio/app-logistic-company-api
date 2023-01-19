import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePackageRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, nullable: false })
  name!: string
}
