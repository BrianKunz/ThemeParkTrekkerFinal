interface FormInputs {
    title: string;
    image?: string;
    description: string;
    created: Date;
    comments: Comment[];
}
export declare function useCreatePost(): {
    handlePostSubmit: () => Promise<void>;
    handlePostFormChange: import("react").ChangeEventHandler<HTMLInputElement>;
    postFormInputs: FormInputs;
    setPostFormInputs: import("react").Dispatch<import("react").SetStateAction<FormInputs>>;
    loadingPosts: boolean;
};
export {};
