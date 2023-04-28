"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateUser = void 0;
const tslib_1 = require("tslib");
const react_1 = require("react");
const useUserStore_1 = require("../../../stores/useUserStore");
const uuid_1 = require("uuid");
function useCreateUser() {
    const [formInputs, setFormInputs] = (0, react_1.useState)({
        email: "",
        username: "",
        password: "",
    });
    const [loading, setLoading] = (0, react_1.useState)(false);
    const { createNewUser } = (0, useUserStore_1.useUserStore)();
    const handleFormChange = ({ target: { name, value }, }) => {
        setFormInputs((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleSubmit = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (loading) {
            return;
        }
        try {
            setLoading(true);
            console.log("Form inputs: ", formInputs);
            yield createNewUser({
                id: (0, uuid_1.v4)(),
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
exports.useCreateUser = useCreateUser;
//# sourceMappingURL=useCreateUser.js.map