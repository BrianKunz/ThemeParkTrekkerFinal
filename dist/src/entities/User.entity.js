"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Trip_entity_1 = require("./Trip.entity");
const Post_entity_1 = require("./Post.entity");
const Comment_entity_1 = require("./Comment.entity");
let User = class User {
    constructor() {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "username", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "email", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "password", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "admin", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "trips", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "posts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "comments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "admin", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => Trip_entity_1.Trip, (trip) => trip.user),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "trips", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => Post_entity_1.Post, (post) => post.user),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "posts", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_entity_1.Comment, (comment) => comment.user),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "comments", void 0);
User = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.entity.js.map