"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddForeignKeyToPost1622481599567 = void 0;
class AddForeignKeyToPost1622481599567 {
    constructor() {
        this.name = "AddForeignKeyToPost1622481599567";
    }
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "post"
            ADD CONSTRAINT "FK_e0e2d2b3f7d3f718977ac9f9c1d"
            FOREIGN KEY ("userId")
            REFERENCES "user"(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "post"
            DROP CONSTRAINT "FK_e0e2d2b3f7d3f718977ac9f9c1d";
        `);
    }
}
exports.AddForeignKeyToPost1622481599567 = AddForeignKeyToPost1622481599567;
//# sourceMappingURL=20230427172000-add-foreign-key-topost.js.map