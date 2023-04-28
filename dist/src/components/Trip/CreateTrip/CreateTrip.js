"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const useCreateTrip_1 = require("./useCreateTrip");
const react_day_picker_1 = require("react-day-picker");
function CreateTrip() {
    const { formInputs, handleFormChange, handleSubmit, setFormInputs } = (0, useCreateTrip_1.useCreateTrip)();
    return (React.createElement("div", { className: "flex flex-col items-center justify-center h-full" },
        React.createElement("h1", { className: "text-2xl font-bold text-center mb-8 text-purple-700" }, "Create a Trip"),
        React.createElement("form", { onSubmit: handleSubmit, method: "POST", className: "w-full max-w-md" },
            React.createElement("div", { className: "mb-4" },
                React.createElement("label", { htmlFor: "title", className: "block text-gray-700 font-bold mb-2" }, "Title"),
                React.createElement("input", { type: "text", name: "title", value: formInputs.title, onChange: handleFormChange, required: true, className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" })),
            React.createElement("div", { className: "mb-4" },
                React.createElement("label", { htmlFor: "start_date", className: "block text-gray-700 font-bold mb-2" }, "Start Date"),
                React.createElement(react_day_picker_1.DayPicker, { selected: formInputs.start_date, onDayClick: (date) => {
                        if (date !== null) {
                            setFormInputs(Object.assign(Object.assign({}, formInputs), { start_date: date }));
                        }
                    }, required: true })),
            React.createElement("div", { className: "mb-4" },
                React.createElement("label", { htmlFor: "end_date", className: "block text-gray-700 font-bold mb-2" }, "End Date"),
                React.createElement(react_day_picker_1.DayPicker, { selected: formInputs.end_date, onDayClick: (date) => {
                        if (date !== null) {
                            setFormInputs(Object.assign(Object.assign({}, formInputs), { end_date: date }));
                        }
                    }, required: true })),
            React.createElement("div", { className: "mb-4" },
                React.createElement("label", { htmlFor: "flight", className: "block text-gray-700 font-bold mb-2" }, "Flight Info"),
                React.createElement("input", { type: "text", name: "flight", value: formInputs.flight, onChange: handleFormChange, className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" })),
            React.createElement("button", { type: "submit", className: "bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" }, "Submit"))));
}
exports.default = CreateTrip;
//# sourceMappingURL=CreateTrip.js.map