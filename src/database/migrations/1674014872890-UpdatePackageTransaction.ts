import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePackageTransaction1674014872890 implements MigrationInterface {
    name = 'UpdatePackageTransaction1674014872890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" RENAME COLUMN "destiny" TO "destination"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" RENAME COLUMN "destination" TO "destiny"`);
    }

}
