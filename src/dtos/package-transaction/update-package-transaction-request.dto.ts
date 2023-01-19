import {IsOptional, IsEnum} from 'class-validator';
import { PackageTransactionStatusEnum } from '../../core/enums';
import {ApiProperty} from "@nestjs/swagger";

export class UpdatePackageTransactionRequest {
  @IsEnum(PackageTransactionStatusEnum)
  @IsOptional()
  @ApiProperty({ required: false, nullable: true, type:PackageTransactionStatusEnum, enum: PackageTransactionStatusEnum })
  public status?: PackageTransactionStatusEnum
}
