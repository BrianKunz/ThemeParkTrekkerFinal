declare const postController: import("express-serve-static-core").Router;
declare module "express-session" {
    interface Session {
        userId?: number;
        token?: string;
    }
}
export default postController;
