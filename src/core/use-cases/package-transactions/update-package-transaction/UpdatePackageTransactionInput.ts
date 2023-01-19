import { IsArray, IsOptional, IsUUID, IsEnum } from 'class-validator';
import { PackageTransactionStatusEnum } from '../../../../core/enums';


export class UpdatePackageTransactionInput {
  @IsUUID()
  public package_transaction_id!: string;

  @IsEnum(PackageTransactionStatusEnum)
  @IsOptional()
  public status?: PackageTransactionStatusEnum
}
