import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateEntities1673831309343 implements MigrationInterface {
    name = 'CreateEntities1673831309343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "logistic"."storage_locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "street" character varying, "number" character varying, "city" character varying, "neighborhood" character varying, "state" character varying, "zipcode" character varying, "lat" character varying, "lng" character varying, "limit_stock" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_42c7c2530345095975848532821" UNIQUE ("name"), CONSTRAINT "PK_1f8980d88f9ebaba668dddd27cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_42c7c253034509597584853282" ON "logistic"."storage_locations" ("name") `);
        await queryRunner.query(`CREATE TYPE "logistic"."package_transactions_status_enum" AS ENUM('waiting-withdrawal', 'sent', 'in-transit', 'delivered')`);
        await queryRunner.query(`CREATE TABLE "logistic"."package_transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "logistic"."package_transactions_status_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "storage_location_id" uuid, "package_id" uuid, CONSTRAINT "PK_79e54ff37bdfc3ac78cc2e6e457" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fbb32b7fe471011fe46078007d" ON "logistic"."package_transactions" ("status") `);
        await queryRunner.query(`CREATE TABLE "logistic"."packages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "storage_location_id" uuid, CONSTRAINT "UQ_4b511952e9d60aac9aa42e653f0" UNIQUE ("name"), CONSTRAINT "PK_020801f620e21f943ead9311c98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4b511952e9d60aac9aa42e653f" ON "logistic"."packages" ("name") `);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ADD CONSTRAINT "FK_580ec5ba17dc8a5a4eb90d5c89e" FOREIGN KEY ("storage_location_id") REFERENCES "logistic"."storage_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" ADD CONSTRAINT "FK_3d64163bff6eba295173ce274df" FOREIGN KEY ("package_id") REFERENCES "logistic"."packages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "logistic"."packages" ADD CONSTRAINT "FK_c29409536fbff7b237f69476d68" FOREIGN KEY ("storage_location_id") REFERENCES "logistic"."storage_locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logistic"."packages" DROP CONSTRAINT "FK_c29409536fbff7b237f69476d68"`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" DROP CONSTRAINT "FK_3d64163bff6eba295173ce274df"`);
        await queryRunner.query(`ALTER TABLE "logistic"."package_transactions" DROP CONSTRAINT "FK_580ec5ba17dc8a5a4eb90d5c89e"`);
        await queryRunner.query(`DROP INDEX "logistic"."IDX_4b511952e9d60aac9aa42e653f"`);
        await queryRunner.query(`DROP TABLE "logistic"."packages"`);
        await queryRunner.query(`DROP INDEX "logistic"."IDX_fbb32b7fe471011fe46078007d"`);
        await queryRunner.query(`DROP TABLE "logistic"."package_transactions"`);
        await queryRunner.query(`DROP TYPE "logistic"."package_transactions_status_enum"`);
        await queryRunner.query(`DROP INDEX "logistic"."IDX_42c7c253034509597584853282"`);
        await queryRunner.query(`DROP TABLE "logistic"."storage_locations"`);
    }

}
