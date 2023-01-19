import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePackageTransactionEntity1674002297309 implements MigrationInterface {
    name = 'UpdatePackageTransactionEntity1674002297309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ALTER COLUMN "stops" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ALTER COLUMN "stops" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ALTER COLUMN "stops" SET DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ALTER COLUMN "stops" SET NOT NULL`);
    }

}
