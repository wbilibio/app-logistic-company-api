import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class ListPackageRequest {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, nullable: false })
  public name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, nullable: false })
  storage_location_id?: string;
  
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, nullable: false, type: 'number' })
  public page?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, nullable: false, type: 'number' })
  public per_page?: number;
}
