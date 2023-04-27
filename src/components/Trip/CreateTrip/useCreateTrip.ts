import { useState } from "react";
import { useTripStore } from "../../../stores/useTripStore";
import { v4 as uuidv4 } from "uuid";

interface FormInputs {
  date: Date;
  title: string;
  start_date: Date;
  end_date: Date;
  flight: string;
}

export function useCreateTrip() {
  const [formInputs, setFormInputs] = useState<FormInputs>({
    date: new Date(),
    title: "",
    start_date: new Date(),
    end_date: new Date(),
    flight: "",
  });
  const [loading, setLoading] = useState(false);
  const { createNewTrip } = useTripStore();

  const handleFormChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
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
    } catch (error) {
      console.log(error);
    } finally {
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
