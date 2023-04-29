"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddForeignKeyToPost1622481599567 = void 0;
const tslib_1 = require("tslib");
class AddForeignKeyToPost1622481599567 {
    constructor() {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "AddForeignKeyToPost1622481599567"
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "post"
            ADD CONSTRAINT "FK_e0e2d2b3f7d3f718977ac9f9c1d"
            FOREIGN KEY ("userId")
            REFERENCES "user"(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "post"
            DROP CONSTRAINT "FK_e0e2d2b3f7d3f718977ac9f9c1d";
        `);
        });
    }
}
exports.AddForeignKeyToPost1622481599567 = AddForeignKeyToPost1622481599567;
//# sourceMappingURL=20230427172000-add-foreign-key-topost.js.map