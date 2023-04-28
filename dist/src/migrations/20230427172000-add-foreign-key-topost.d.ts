import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddForeignKeyToPost1622481599567 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
