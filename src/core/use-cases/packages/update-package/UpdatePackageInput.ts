import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdatePackageInput {
  @IsUUID()
  public id!: string;

  @IsString()
  @IsNotEmpty()
  public name!: string;
}
