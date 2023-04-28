"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const useCreateTrip_1 = require("./useCreateTrip");
const react_day_picker_1 = require("react-day-picker");
function CreateTrip() {
    const { formInputs, handleFormChange, handleSubmit, setFormInputs } = (0, useCreateTrip_1.useCreateTrip)();
    return (React.createElement("form", { onSubmit: handleSubmit, method: "POST" },
        React.createElement("label", { htmlFor: "title" }, "Title"),
        React.createElement("input", { type: "text", name: "title", value: formInputs.title, onChange: handleFormChange, required: true }),
        React.createElement("label", { htmlFor: "start_date" }, "Start Date"),
        React.createElement(react_day_picker_1.DayPicker, { selected: formInputs.start_date, onDayClick: (date) => {
                if (date !== null) {
                    setFormInputs(Object.assign(Object.assign({}, formInputs), { start_date: date }));
                }
            }, required: true }),
        React.createElement(react_day_picker_1.DayPicker, { selected: formInputs.end_date, onDayClick: (date) => {
                if (date !== null) {
                    setFormInputs(Object.assign(Object.assign({}, formInputs), { end_date: date }));
                }
            }, required: true }),
        React.createElement("label", { htmlFor: "flight" }, "Flight Info"),
        React.createElement("input", { type: "text", name: "flight", value: formInputs.flight, onChange: handleFormChange }),
        React.createElement("button", { type: "submit" }, "Submit")));
}
exports.default = CreateTrip;
//# sourceMappingURL=CreateTrip.js.map