import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePackageInput {
  @IsString()
  @IsNotEmpty()
  public name!: string;
}
