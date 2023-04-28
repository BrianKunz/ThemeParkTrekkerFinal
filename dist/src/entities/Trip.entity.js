"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
let Trip = class Trip {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", String)
], Trip.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], Trip.prototype, "date", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Trip.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], Trip.prototype, "start_date", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], Trip.prototype, "end_date", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Trip.prototype, "flight", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, (user) => user.trips),
    tslib_1.__metadata("design:type", Object)
], Trip.prototype, "user", void 0);
Trip = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Trip);
exports.Trip = Trip;
//# sourceMappingURL=Trip.entity.js.map