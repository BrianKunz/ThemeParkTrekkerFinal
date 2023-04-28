"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Post_entity_1 = require("./Post.entity");
const User_entity_1 = require("./User.entity");
let Comment = class Comment {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", String)
], Comment.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], Comment.prototype, "time", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Comment.prototype, "body", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => Post_entity_1.Post, (post) => post.comments),
    tslib_1.__metadata("design:type", Post_entity_1.Post)
], Comment.prototype, "post", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, (user) => user.trips),
    tslib_1.__metadata("design:type", User_entity_1.User)
], Comment.prototype, "user", void 0);
Comment = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=Comment.entity.js.map