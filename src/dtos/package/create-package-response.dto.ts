import { ApiProperty } from "@nestjs/swagger";

export class CreatePackageResponse {
  @ApiProperty({ required:  true, nullable: false, type: 'string', format: 'uuid' })
  public package_id!: string;
}
