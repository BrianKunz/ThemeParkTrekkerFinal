interface FormInputs {
    date: Date;
    title: string;
    start_date: Date;
    end_date: Date;
    flight: string;
}
export declare function useCreateTrip(): {
    handleSubmit: () => Promise<void>;
    handleFormChange: import("react").ChangeEventHandler<HTMLInputElement>;
    formInputs: FormInputs;
    setFormInputs: import("react").Dispatch<import("react").SetStateAction<FormInputs>>;
    loading: boolean;
};
export {};
