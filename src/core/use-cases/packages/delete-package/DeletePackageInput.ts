import { IsUUID } from 'class-validator';

export class DeletePackageInput {
  @IsUUID()
  public id!: string;
}
