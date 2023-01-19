import { IsUUID } from 'class-validator';

export class AssociatePackageStorageInput {
  @IsUUID()
  public package_id!: string;

  @IsUUID()
  public storage_location_id!: string;
}
