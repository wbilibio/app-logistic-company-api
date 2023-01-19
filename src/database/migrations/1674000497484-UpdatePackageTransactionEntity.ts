import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePackageTransactionEntity1674000497484 implements MigrationInterface {
    name = 'UpdatePackageTransactionEntity1674000497484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" DROP CONSTRAINT "FK_725c9ff3b475d0cc02042e03f5a"`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" DROP COLUMN "storage_location_destiny_id"`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ADD "destiny" json NOT NULL`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" DROP COLUMN "stops"`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ADD "stops" json array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" DROP COLUMN "stops"`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ADD "stops" uuid array`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" DROP COLUMN "destiny"`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ADD "storage_location_destiny_id" uuid`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ADD CONSTRAINT "FK_725c9ff3b475d0cc02042e03f5a" FOREIGN KEY ("storage_location_destiny_id") REFERENCES "logistic"."storage_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
