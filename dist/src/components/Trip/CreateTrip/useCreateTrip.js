"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateTrip = void 0;
const react_1 = require("react");
const useTripStore_1 = require("../../../stores/useTripStore");
const uuid_1 = require("uuid");
function useCreateTrip() {
    const [formInputs, setFormInputs] = (0, react_1.useState)({
        date: new Date(),
        title: "",
        start_date: new Date(),
        end_date: new Date(),
        flight: "",
    });
    const [loading, setLoading] = (0, react_1.useState)(false);
    const { createNewTrip } = (0, useTripStore_1.useTripStore)();
    const handleFormChange = ({ target: { name, value }, }) => {
        setFormInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async () => {
        if (loading) {
            return;
        }
        try {
            setLoading(true);
            await createNewTrip({
                id: (0, uuid_1.v4)(),
                date: formInputs.date,
                title: formInputs.title,
                start_date: formInputs.start_date,
                end_date: formInputs.end_date,
                flight: formInputs.flight,
            });
            setFormInputs({
                date: new Date(),
                title: "",
                start_date: new Date(),
                end_date: new Date(),
                flight: "",
            });
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };
    return {
        handleSubmit,
        handleFormChange,
        formInputs,
        setFormInputs,
        loading,
    };
}
exports.useCreateTrip = useCreateTrip;
//# sourceMappingURL=useCreateTrip.js.map