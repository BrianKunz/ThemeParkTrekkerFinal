import { __decorate, __metadata } from "tslib";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, } from "typeorm";
import { User } from "./User.entity";
import { Comment } from "./Comment.entity";
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
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Post.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "image", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Post.prototype, "description", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], Post.prototype, "created", void 0);
__decorate([
    ManyToOne(() => User, { eager: true }),
    __metadata("design:type", Object)
], Post.prototype, "user", void 0);
__decorate([
    OneToMany(() => Comment, (comment) => comment.post),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
Post = __decorate([
    Entity(),
    __metadata("design:paramtypes", [String, Object, String, Date, Object])
], Post);
export { Post };
//# sourceMappingURL=Post.entity.js.map