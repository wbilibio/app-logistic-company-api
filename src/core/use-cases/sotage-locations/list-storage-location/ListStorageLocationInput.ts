import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class ListStorageLocationInput {
  @IsString()
  @IsOptional()
  public name?: string;
  
  @IsNumber()
  @IsOptional()
  public page?: number;

  @IsNumber()
  @IsOptional()
  public per_page?: number;
}
