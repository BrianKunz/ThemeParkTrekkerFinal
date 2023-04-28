"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const useTripStore_1 = require("../../stores/useTripStore");
const Trip = ({ trip: { id, date, title, start_date, end_date, flight }, user, }) => {
    const { updateTrip, deleteTrip } = (0, useTripStore_1.useTripStore)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleChange = ({ target: { name, value }, }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        console.log({ value });
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            yield updateTrip({
                id,
                user,
                date,
                title,
                start_date,
                end_date,
                flight,
                [name]: value,
            });
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    });
    const handleDelete = () => {
        if (!id) {
            return;
        }
        deleteTrip(id);
    };
    const handleSubmit = (event) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        console.log("Save button clicked");
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            yield updateTrip({
                id,
                user,
                date,
                title,
                start_date,
                end_date,
                flight,
            });
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h4", null, title),
        react_1.default.createElement("p", null,
            "Start Date: ",
            new Date(start_date).toLocaleDateString()),
        react_1.default.createElement("p", null,
            "End Date: ",
            new Date(end_date).toLocaleDateString()),
        react_1.default.createElement("p", null,
            "Flight: ",
            flight),
        react_1.default.createElement("button", { onClick: handleDelete }, "Delete"),
        react_1.default.createElement("br", null),
        react_1.default.createElement("input", { name: "title", type: "text", onChange: handleChange, value: title }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("input", { name: "start_date", type: "date", onChange: handleChange, value: start_date.toISOString().substr(0, 10) }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("input", { name: "end_date", type: "date", onChange: handleChange, value: end_date.toISOString().substr(0, 10) }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("input", { name: "flight", type: "text", onChange: handleChange, value: flight }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("button", { disabled: loading, onClick: handleSubmit }, "Save")));
};
exports.Trip = Trip;
//# sourceMappingURL=Trip.js.map