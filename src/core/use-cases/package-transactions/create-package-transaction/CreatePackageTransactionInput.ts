import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsUUID, IsEnum, IsString, ValidateNested } from 'class-validator';
import { PackageTransactionStatusEnum } from '../../../../core/enums';
import { Type } from 'class-transformer';

class AddressPoint {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsString()
  @IsOptional()
  public address?: string;

  @IsString()
  @IsOptional()
  public lat?: string;

  @IsString()
  @IsOptional()
  public lng?: string;
}
export class CreatePackageTransactionInput {
  @IsUUID()
  public package_id!: string;

  @ValidateNested()
  @Type(() => AddressPoint)
  public destination!: AddressPoint;

  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressPoint)
  public stops?: AddressPoint[];

  @IsEnum(PackageTransactionStatusEnum)
  @IsOptional()
  public status?: PackageTransactionStatusEnum
}
