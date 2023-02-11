import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdatePackageCategoryInput {
  @IsUUID()
  public id!: string;

  @IsString()
  @IsNotEmpty()
  public name!: string;
}
