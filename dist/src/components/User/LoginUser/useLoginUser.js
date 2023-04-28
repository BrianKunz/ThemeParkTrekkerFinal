"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLoginUser = void 0;
const react_1 = require("react");
const useUserStore_1 = require("../../../stores/useUserStore");
function useLoginUser() {
    const [loginFormInputs, setLoginFormInputs] = (0, react_1.useState)({
        username: "",
        password: "",
    });
    const [loadingLogin, setLoadingLogin] = (0, react_1.useState)(false);
    const { login } = (0, useUserStore_1.useUserStore)();
    const handleLoginFormChange = ({ target: { name, value }, }) => {
        setLoginFormInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleLoginSubmit = async () => {
        if (loadingLogin) {
            return;
        }
        try {
            setLoadingLogin(true);
            console.log("Form inputs: ", loginFormInputs);
            await login({
                username: loginFormInputs.username,
                password: loginFormInputs.password,
            });
            console.log("User logged in: ", loginFormInputs.username);
            setLoginFormInputs({
                username: "",
                password: "",
            });
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoadingLogin(false);
        }
    };
    return {
        handleLoginSubmit,
        handleLoginFormChange,
        loginFormInputs,
        loadingLogin,
    };
}
exports.useLoginUser = useLoginUser;
//# sourceMappingURL=useLoginUser.js.map