import { ApiProperty } from "@nestjs/swagger";

class StorageLocation {
  @ApiProperty({ required: true, nullable: false, type: 'string', format: 'uuid' })
  public id!: string;
  
  @ApiProperty({ required: true, nullable: false })
  public name!: string;
  
  @ApiProperty({ required: false, nullable: true })
  public stret?: string;
  
  @ApiProperty({ required: false, nullable: true })
  public neighborhood?: string;
  
  @ApiProperty({ required: false, nullable: true })
  public city?: string;

  @ApiProperty({ required: false, nullable: true })
  public zipcode?: string;
  
  @ApiProperty({ required: false, nullable: true })
  public state?: string;
  
  @ApiProperty({ required: false, nullable: true })
  public number?: string;
  
  @ApiProperty({ required: false, nullable: true })
  public lat?: string;
  
  @ApiProperty({ required: false, nullable: true })
  public lng?: string;
  
  @ApiProperty({ required: false, nullable: true })
  public limit_stock?: number;

  @ApiProperty({ required: false, nullable: true })
  public current_stock?: number;
  
  @ApiProperty({ required: false, nullable: false, type: 'string', format: 'Date' })
  public created_at!: Date;
  
  @ApiProperty({ required: false, nullable: false, type: 'string', format: 'Date' })
  public updated_at!: Date;
  
  @ApiProperty({ required: false, nullable: true, type: 'string', format: 'Date' })
  public deleted_at?: Date;
}

export class ListStorageLocationResponse {
  @ApiProperty({ required: true, nullable: false, type: [StorageLocation] })
  public list!: StorageLocation[];
  
  @ApiProperty({ required: true, nullable: false, type: 'number' })
  public count!: number;
}
