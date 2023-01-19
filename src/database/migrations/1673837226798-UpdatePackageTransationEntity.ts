import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePackageTransationEntity1673837226798 implements MigrationInterface {
    name = 'UpdatePackageTransationEntity1673837226798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ADD "stops" uuid array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" DROP COLUMN "stops"`);
    }

}
