import { ApiProperty } from "@nestjs/swagger";
import { PackageTransactionStatusEnum } from "../../core/enums";


class AddressPoint {
  @ApiProperty({ required: false, nullable: true })
  public name?: string;

  @ApiProperty({ required: false, nullable: true })
  public address?: string;

  @ApiProperty({ required: false, nullable: true })
  public lat?: string;

  @ApiProperty({ required: false, nullable: true })
  public lng?: string;
}
export class StorageLocation {
  @ApiProperty({ required: false, nullable: true, type: 'string', format: 'uuid' })
  public id?: string;
  
  @ApiProperty({ required: false, nullable: true })
  public name?: string;
  
  @ApiProperty({ required: false, nullable: true })
  public lat?: string;
  
  @ApiProperty({ required: false, nullable: true })
  public lng?: string;
}

export class Transactions {
  @ApiProperty({ required: false, nullable: true, type: 'string', format: 'uuid' })
  public id?: string;

  @ApiProperty({ required: false, nullable: true, type: StorageLocation  })
  public origin?: StorageLocation;
  
  @ApiProperty({ required: false, nullable: true, type: AddressPoint  })
  public destination?: AddressPoint;

  @ApiProperty({ required: false, nullable: true, type: [AddressPoint], isArray: true  })
  public stops?: AddressPoint[];
  
  @ApiProperty({ required: false, nullable: true, type: PackageTransactionStatusEnum, enum: PackageTransactionStatusEnum  })
  public status?: PackageTransactionStatusEnum;
}
export class GetPackageResponse {
  @ApiProperty({ required: true, nullable: false, type: 'string', format: 'uuid' })
  public id!: string;

  @ApiProperty({ required: true, nullable: false })
  public name!: string;
  
  @ApiProperty({ required: false, nullable: false, type: 'string', format: 'Date' })
  public created_at!: Date;
  
  @ApiProperty({ required: false, nullable: false, type: 'string', format: 'Date' })
  public updated_at!: Date;
  
  @ApiProperty({ required: false, nullable: true, type: 'string', format: 'Date' })
  public deleted_at?: Date;

  @ApiProperty({ required: false, nullable: true, type: [Transactions], isArray: true  })
  public transactions?: Transactions[]

  @ApiProperty({ required: false, nullable: true, type: [StorageLocation] })
  public storage_location?: StorageLocation;
}
