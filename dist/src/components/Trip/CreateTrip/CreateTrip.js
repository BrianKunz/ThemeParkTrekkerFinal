"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const useCreateTrip_1 = require("./useCreateTrip");
const react_day_picker_1 = require("react-day-picker");
function CreateTrip() {
    const { formInputs, handleFormChange, handleSubmit, setFormInputs } = (0, useCreateTrip_1.useCreateTrip)();
    return (react_1.default.createElement("form", { onSubmit: handleSubmit, method: "POST" },
        react_1.default.createElement("label", { htmlFor: "title" }, "Title"),
        react_1.default.createElement("input", { type: "text", name: "title", value: formInputs.title, onChange: handleFormChange, required: true }),
        react_1.default.createElement("label", { htmlFor: "start_date" }, "Start Date"),
        react_1.default.createElement(react_day_picker_1.DayPicker, { selected: formInputs.start_date, onDayClick: (date) => {
                if (date !== null) {
                    setFormInputs({ ...formInputs, start_date: date });
                }
            }, required: true }),
        react_1.default.createElement(react_day_picker_1.DayPicker, { selected: formInputs.end_date, onDayClick: (date) => {
                if (date !== null) {
                    setFormInputs({ ...formInputs, end_date: date });
                }
            }, required: true }),
        react_1.default.createElement("label", { htmlFor: "flight" }, "Flight Info"),
        react_1.default.createElement("input", { type: "text", name: "flight", value: formInputs.flight, onChange: handleFormChange }),
        react_1.default.createElement("button", { type: "submit" }, "Submit")));
}
exports.default = CreateTrip;
//# sourceMappingURL=CreateTrip.js.map