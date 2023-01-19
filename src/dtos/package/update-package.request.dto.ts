import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePackageRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, nullable: false })
  public name!: string;
}
