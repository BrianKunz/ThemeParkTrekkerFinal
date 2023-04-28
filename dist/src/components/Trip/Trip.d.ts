import React from "react";
import { Trip as TripEntity } from "../../entities/Trip.entity";
import { User } from "../../entities/User.entity";
export interface TripProps {
    key?: string;
    trip: TripEntity;
    user?: User | undefined;
}
export declare const Trip: React.FC<TripProps>;
