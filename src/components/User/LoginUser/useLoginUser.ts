import { useState } from "react";
import { useUserStore } from "../../../stores/useUserStore";

interface FormInputs {
  username: string;
  password: string;
}

export function useLoginUser() {
  const [loginFormInputs, setLoginFormInputs] = useState<FormInputs>({
    username: "",
    password: "",
  });
  const [loadingLogin, setLoadingLogin] = useState(false);
  const { login } = useUserStore();
  const handleLoginFormChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
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
      await login({
        username: loginFormInputs.username,
        password: loginFormInputs.password,
      });
      setLoginFormInputs({
        username: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
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
