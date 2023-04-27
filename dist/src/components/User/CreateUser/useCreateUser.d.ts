export interface FormInputs {
    email: string;
    username: string;
    password: string;
}
export declare function useCreateUser(): {
    handleSubmit: () => Promise<void>;
    handleFormChange: import("react").ChangeEventHandler<HTMLInputElement>;
    formInputs: FormInputs;
};
