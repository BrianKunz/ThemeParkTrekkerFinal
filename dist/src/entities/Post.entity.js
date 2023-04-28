"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const Comment_entity_1 = require("./Comment.entity");
let Post = class Post {
    constructor(title, image, description, created, user // make user nullable
    ) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.created = created;
        this.user = user;
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "image", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "created", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, { nullable: false, onDelete: "CASCADE" }),
    tslib_1.__metadata("design:type", User_entity_1.User)
], Post.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_entity_1.Comment, (comment) => comment.post),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "comments", void 0);
Post = tslib_1.__decorate([
    (0, typeorm_1.Entity)(),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Date,
        User_entity_1.User])
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.entity.js.map