import { __awaiter } from "tslib";
import { useState } from "react";
import { useUserStore } from "../../../stores/useUserStore";
export function useLoginUser() {
    const [loginFormInputs, setLoginFormInputs] = useState({
        username: "",
        password: "",
    });
    const [loadingLogin, setLoadingLogin] = useState(false);
    const { login } = useUserStore();
    const handleLoginFormChange = ({ target: { name, value }, }) => {
        setLoginFormInputs((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleLoginSubmit = () => __awaiter(this, void 0, void 0, function* () {
        if (loadingLogin) {
            return;
        }
        try {
            setLoadingLogin(true);
            console.log("Form inputs: ", loginFormInputs);
            yield login({
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
    });
    return {
        handleLoginSubmit,
        handleLoginFormChange,
        loginFormInputs,
        loadingLogin,
    };
}
//# sourceMappingURL=useLoginUser.js.map