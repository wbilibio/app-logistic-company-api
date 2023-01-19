import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStorageLocationInput {
  @IsString()
  @IsNotEmpty()
  public name!: string;

  @IsString()
  @IsOptional()
  public street?: string;

  @IsString()
  @IsOptional()
  public neighborhood?: string;

  @IsString()
  @IsOptional()
  public city?: string;

  @IsString()
  @IsOptional()
  public state?: string;

  @IsString()
  @IsOptional()
  public zipcode?: string;

  @IsString()
  @IsOptional()
  public number?: string;

  @IsString()
  @IsOptional()
  public lat?: string;

  @IsString()
  @IsOptional()
  public lng?: string;

  @IsNumber()
  @IsOptional()
  public limit_stock?: number;
}
