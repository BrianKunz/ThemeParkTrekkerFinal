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
    return (react_1.default.createElement("div", { className: "border border-gray-300 shadow-md rounded-md p-4 my-4 mx-auto w-full lg:w-3/4 xl:w-1/2" },
        react_1.default.createElement("h4", { className: "text-xl font-bold mb-4" }, title),
        react_1.default.createElement("p", { className: "text-sm mb-2" },
            "Start Date: ",
            new Date(start_date).toLocaleDateString()),
        react_1.default.createElement("p", { className: "text-sm mb-2" },
            "End Date: ",
            new Date(end_date).toLocaleDateString()),
        react_1.default.createElement("p", { className: "text-sm mb-4" },
            "Flight: ",
            flight),
        react_1.default.createElement("button", { className: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4", onClick: handleDelete }, "Delete"),
        react_1.default.createElement("br", null),
        react_1.default.createElement("input", { className: "border rounded py-2 px-3 mb-2", name: "title", type: "text", onChange: handleChange, value: title }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("input", { className: "border rounded py-2 px-3 mb-2", name: "start_date", type: "date", onChange: handleChange, value: start_date.toISOString().substr(0, 10) }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("input", { className: "border rounded py-2 px-3 mb-2", name: "end_date", type: "date", onChange: handleChange, value: end_date.toISOString().substr(0, 10) }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("input", { className: "border rounded py-2 px-3 mb-4", name: "flight", type: "text", onChange: handleChange, value: flight }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("button", { className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed", disabled: loading, onClick: handleSubmit }, loading ? "Saving..." : "Save")));
};
exports.Trip = Trip;
//# sourceMappingURL=Trip.js.map