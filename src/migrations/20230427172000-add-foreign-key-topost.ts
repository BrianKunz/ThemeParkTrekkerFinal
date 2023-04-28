import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForeignKeyToPost1622481599567 implements MigrationInterface {
  name = "AddForeignKeyToPost1622481599567";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "post"
            ADD CONSTRAINT "FK_e0e2d2b3f7d3f718977ac9f9c1d"
            FOREIGN KEY ("userId")
            REFERENCES "user"(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "post"
            DROP CONSTRAINT "FK_e0e2d2b3f7d3f718977ac9f9c1d";
        `);
  }
}
