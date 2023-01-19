import { IsOptional, IsUUID } from 'class-validator';

export class GetPackageInput {
  @IsUUID()
  public id!: string;

  @IsUUID()
  @IsOptional()
  public storage_location_id?: string
}
