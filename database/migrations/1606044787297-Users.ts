import { MigrationInterface, QueryRunner } from 'typeorm';

const CONSTRAINT_RECEIPT_TO_USER_FK = 'fk__receipt__user_account';

export class Users1606044787297 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "user_account" (
          "id" uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
          "username" text NOT NULL, 
          "password" text NOT NULL, 
          "email" text NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        );`);

    await queryRunner.query(`
        ALTER TABLE "receipt"
          ADD COLUMN "creator" uuid NOT NULL,
          ADD CONSTRAINT "${CONSTRAINT_RECEIPT_TO_USER_FK}"
            FOREIGN KEY("creator")
              REFERENCES user_account("id");
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "receipt"
        DROP CONSTRAINT "${CONSTRAINT_RECEIPT_TO_USER_FK}";
    `);

    await queryRunner.query(`
      ALTER TABLE "receipt"
        DROP COLUMN "creator";
    `);

    await queryRunner.query(`DROP TABLE user_account;`);
  }
}
