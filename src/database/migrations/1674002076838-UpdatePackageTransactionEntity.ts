import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePackageTransactionEntity1674002076838 implements MigrationInterface {
    name = 'UpdatePackageTransactionEntity1674002076838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" DROP COLUMN "stops"`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ADD "stops" jsonb NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" DROP COLUMN "stops"`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ADD "stops" json array`);
    }

}
