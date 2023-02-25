import { Document } from "mongoose";


export interface Iuser extends Document {
    name: string;
    location: string;
    age: number;
}
