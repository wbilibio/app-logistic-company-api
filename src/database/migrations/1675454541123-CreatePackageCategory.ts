import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePackageCategory1675454541123 implements MigrationInterface {
    name = 'CreatePackageCategory1675454541123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "logistic"."package_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_2b8bf90ee4a53878ba69c7a5a0e" UNIQUE ("name"), CONSTRAINT "PK_a9e57534d1caf67d2c8e9ff3cca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2b8bf90ee4a53878ba69c7a5a0" ON "logistic"."package_categories" ("name") `);
        await queryRunner.query(`ALTER TABLE "logistic"."packages" ADD "package_category_id" uuid`);
        await queryRunner.query(`ALTER TABLE "logistic"."packages" ADD CONSTRAINT "FK_72a1b6faa2f099095b2a7ceb61c" FOREIGN KEY ("package_category_id") REFERENCES "logistic"."package_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logistic"."packages" DROP CONSTRAINT "FK_72a1b6faa2f099095b2a7ceb61c"`);
        await queryRunner.query(`ALTER TABLE "logistic"."packages" DROP COLUMN "package_category_id"`);
        await queryRunner.query(`DROP INDEX "logistic"."IDX_2b8bf90ee4a53878ba69c7a5a0"`);
        await queryRunner.query(`DROP TABLE "logistic"."package_categories"`);
    }

}
