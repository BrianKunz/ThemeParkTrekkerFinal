import { User } from "./User.entity";
export declare class Trip {
    id?: string;
    date: Date;
    title: string;
    start_date: Date;
    end_date: Date;
    flight?: string;
    user?: string | User;
}
