import { __decorate, __metadata } from "tslib";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post.entity";
import { User } from "./User.entity";
let Comment = class Comment {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], Comment.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], Comment.prototype, "time", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Comment.prototype, "body", void 0);
__decorate([
    ManyToOne(() => Post, (post) => post.comments),
    __metadata("design:type", Post)
], Comment.prototype, "post", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.trips),
    __metadata("design:type", Object)
], Comment.prototype, "user", void 0);
Comment = __decorate([
    Entity()
], Comment);
export { Comment };
//# sourceMappingURL=Comment.entity.js.map