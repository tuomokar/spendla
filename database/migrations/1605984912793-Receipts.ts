import { MigrationInterface, QueryRunner } from 'typeorm';

const CONSTRAINT_PRODUCT_TO_RECEIPT_FOREIGN_KEY = 'fk_product_receipt';

export class Receipts1605984912793 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "receipt" (
        "id" uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
      );`,
    );
    await queryRunner.query(
      `ALTER TABLE "product"
        ADD COLUMN "receipt_id" uuid NOT NULL,
        ADD CONSTRAINT ${CONSTRAINT_PRODUCT_TO_RECEIPT_FOREIGN_KEY}
          FOREIGN KEY("receipt_id") 
            REFERENCES receipt("id");
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product"
        DROP CONSTRAINT "${CONSTRAINT_PRODUCT_TO_RECEIPT_FOREIGN_KEY}";
      `,
    );

    await queryRunner.query(
      `ALTER TABLE "product"
        DROP COLUMN "receipt_id";
      `,
    );

    await queryRunner.query(`DROP TABLE "receipt"`);
  }
}
