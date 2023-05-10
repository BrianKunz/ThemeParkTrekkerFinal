import { useState } from "react";
import { useUserStore } from "../../../stores/useUserStore";
import { v4 as uuidv4 } from "uuid";

export interface FormInputs {
  email: string;
  username: string;
  password: string;
}

export function useCreateUser() {
  const [formInputs, setFormInputs] = useState<FormInputs>({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { createNewUser } = useUserStore();
  const handleFormChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    setFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      console.log("Form inputs: ", formInputs);
      await createNewUser({
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    handleFormChange,
    formInputs,
  };
}
