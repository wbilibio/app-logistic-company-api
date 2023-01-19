import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class ListPackageInput {
  @IsString()
  @IsOptional()
  public name?: string;
  
  @IsNumber()
  @IsOptional()
  public page?: number;

  @IsNumber()
  @IsOptional()
  public per_page?: number;

  @IsUUID()
  @IsOptional()
  public storage_location_id?: string;
}
