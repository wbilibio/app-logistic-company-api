import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePackageCategoryInput {
  @IsString()
  @IsNotEmpty()
  public name!: string;
}
