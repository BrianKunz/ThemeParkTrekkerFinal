interface FormInputs {
    username: string;
    password: string;
}
export declare function useLoginUser(): {
    handleLoginSubmit: () => Promise<void>;
    handleLoginFormChange: import("react").ChangeEventHandler<HTMLInputElement>;
    loginFormInputs: FormInputs;
    loadingLogin: boolean;
};
export {};
