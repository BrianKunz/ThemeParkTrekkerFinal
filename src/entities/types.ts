import { Request as ExpressRequest } from "express";
import { User } from "./User.entity";

export type Request = ExpressRequest & { user?: User };
