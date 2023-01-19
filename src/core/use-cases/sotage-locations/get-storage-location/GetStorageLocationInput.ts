import { IsUUID } from 'class-validator';

export class GetStorageLocationInput {
  @IsUUID()
  public id!: string;
}
