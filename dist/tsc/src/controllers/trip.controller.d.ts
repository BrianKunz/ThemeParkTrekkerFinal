declare const tripController: import("express-serve-static-core").Router;
declare module "express-session" {
    interface Session {
        userId?: number;
    }
}
export default tripController;
