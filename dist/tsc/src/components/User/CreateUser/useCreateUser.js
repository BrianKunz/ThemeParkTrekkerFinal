import { __awaiter } from "tslib";
import { useState } from "react";
import { useUserStore } from "../../../stores/useUserStore";
import { v4 as uuidv4 } from "uuid";
export function useCreateUser() {
    const [formInputs, setFormInputs] = useState({
        email: "",
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const { createNewUser } = useUserStore();
    const handleFormChange = ({ target: { name, value }, }) => {
        setFormInputs((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleSubmit = () => __awaiter(this, void 0, void 0, function* () {
        if (loading) {
            return;
        }
        try {
            setLoading(true);
            console.log("Form inputs: ", formInputs);
            yield createNewUser({
                id: uuidv4(),
                username: formInputs.username,
                email: formInputs.email,
                password: formInputs.password,
                admin: false,
            });
            setFormInputs({
                email: "",
                username: "",
                password: "",
            });
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    });
    return {
        handleSubmit,
        handleFormChange,
        formInputs,
    };
}
//# sourceMappingURL=useCreateUser.js.map