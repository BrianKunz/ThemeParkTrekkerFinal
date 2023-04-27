import { __awaiter } from "tslib";
import { useState } from "react";
import { useTripStore } from "../../../stores/useTripStore";
import { v4 as uuidv4 } from "uuid";
export function useCreateTrip() {
    const [formInputs, setFormInputs] = useState({
        date: new Date(),
        title: "",
        start_date: new Date(),
        end_date: new Date(),
        flight: "",
    });
    const [loading, setLoading] = useState(false);
    const { createNewTrip } = useTripStore();
    const handleFormChange = ({ target: { name, value }, }) => {
        setFormInputs((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleSubmit = () => __awaiter(this, void 0, void 0, function* () {
        if (loading) {
            return;
        }
        try {
            setLoading(true);
            yield createNewTrip({
                id: uuidv4(),
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
    });
    return {
        handleSubmit,
        handleFormChange,
        formInputs,
        setFormInputs,
        loading,
    };
}
//# sourceMappingURL=useCreateTrip.js.map