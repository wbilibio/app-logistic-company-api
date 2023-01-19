import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStorageLocationRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, nullable: false })
  public name!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, nullable: true })
  public street?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, nullable: true })
  public neighborhood?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, nullable: true })
  public city?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, nullable: true })
  public state?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, nullable: true })
  public zipcode?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, nullable: true })
  public number?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, nullable: true })
  public lat?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, nullable: true })
  public lng?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, nullable: true })
  public limit_stock?: number;
}
