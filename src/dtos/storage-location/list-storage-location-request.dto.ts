import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ListStorageLocationRequest {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, nullable: false })
  public name?: string;
  
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, nullable: false, type: 'number' })
  public page?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, nullable: false, type: 'number' })
  public per_page?: number;
}
