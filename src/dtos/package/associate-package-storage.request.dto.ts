import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AssociatePackageStorageRequest {
  @IsUUID()
  @ApiProperty({ required: true, nullable: false, type: 'string', format: 'uuid' })
  public storage_location_id!: string;
}
