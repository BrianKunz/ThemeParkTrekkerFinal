import { __decorate, __metadata } from "tslib";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User.entity";
let Trip = class Trip {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], Trip.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], Trip.prototype, "date", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Trip.prototype, "title", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], Trip.prototype, "start_date", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], Trip.prototype, "end_date", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Trip.prototype, "flight", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.trips),
    __metadata("design:type", Object)
], Trip.prototype, "user", void 0);
Trip = __decorate([
    Entity()
], Trip);
export { Trip };
//# sourceMappingURL=Trip.entity.js.map