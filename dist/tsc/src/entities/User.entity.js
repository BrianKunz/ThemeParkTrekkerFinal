import { __decorate, __metadata } from "tslib";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Trip } from "./Trip.entity";
import { Post } from "./Post.entity";
import { Comment } from "./Comment.entity";
let User = class User {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "admin", void 0);
__decorate([
    OneToMany(() => Trip, (trip) => trip.user),
    __metadata("design:type", Array)
], User.prototype, "trips", void 0);
__decorate([
    OneToMany(() => Post, (post) => post.user),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    OneToMany(() => Comment, (comment) => comment.user),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
User = __decorate([
    Entity()
], User);
export { User };
//# sourceMappingURL=User.entity.js.map