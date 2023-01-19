import { PackageTransactionStatusEnum } from "../../../../core/enums";

export class StorageLocation {
  public id?: string;
  public name?: string;
  public lat?: string;
  public lng?: string;
}

class AddressPoint {
  public name?: string;
  public address?: string;
  public lat?: string;
  public lng?: string;
}


export class Transactions {
  public id?: string;
  public origin?: StorageLocation;
  public destination?: AddressPoint;
  public stops?: AddressPoint[];
  public status?: PackageTransactionStatusEnum;
}
export class GetPackageOutput {
  public id!: string;
  public name!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at?: Date;
  public storage_location?: StorageLocation;
  public transactions?: Transactions[]
}
