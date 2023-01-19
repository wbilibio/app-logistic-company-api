import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsUUID, IsEnum, IsString, ValidateNested, IsNotEmpty } from 'class-validator';
import { PackageTransactionStatusEnum } from '../../core/enums';
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
export class CreatePackageTransactionRequest {
  @IsUUID()
  @ApiProperty({ required: true, nullable: false, type: 'string', format: 'uuid' })
  public package_id!: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressPoint)
  @ApiProperty({ required: true, nullable: false, type: AddressPoint })
  public destination!: AddressPoint;

  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressPoint)
  @ApiProperty({ required: false, nullable: true, type: [AddressPoint], isArray: true })
  public stops?: AddressPoint[];

  @IsEnum(PackageTransactionStatusEnum)
  @IsOptional()
  @ApiProperty({ required: false, nullable: true, type:PackageTransactionStatusEnum, enum: PackageTransactionStatusEnum })
  public status?: PackageTransactionStatusEnum
}
