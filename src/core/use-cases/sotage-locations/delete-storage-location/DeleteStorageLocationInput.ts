import { IsUUID } from 'class-validator';

export class DeleteStorageLocationInput {
  @IsUUID()
  public id!: string;
}
