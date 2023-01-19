import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePackageTransactionEntity1673928246470 implements MigrationInterface {
    name = 'UpdatePackageTransactionEntity1673928246470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" DROP CONSTRAINT "FK_580ec5ba17dc8a5a4eb90d5c89e"`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" DROP COLUMN "storage_location_id"`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ADD "storage_location_origin_id" uuid`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ADD "storage_location_destiny_id" uuid`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ADD CONSTRAINT "FK_6898fe0e4c01fa9d93058288186" FOREIGN KEY ("storage_location_origin_id") REFERENCES "logistic"."storage_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ADD CONSTRAINT "FK_725c9ff3b475d0cc02042e03f5a" FOREIGN KEY ("storage_location_destiny_id") REFERENCES "logistic"."storage_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" DROP CONSTRAINT "FK_725c9ff3b475d0cc02042e03f5a"`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" DROP CONSTRAINT "FK_6898fe0e4c01fa9d93058288186"`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" DROP COLUMN "storage_location_destiny_id"`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" DROP COLUMN "storage_location_origin_id"`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ADD "storage_location_id" uuid`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ADD CONSTRAINT "FK_580ec5ba17dc8a5a4eb90d5c89e" FOREIGN KEY ("storage_location_id") REFERENCES "logistic"."storage_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
