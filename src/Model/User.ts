import mongoose, { Schema } from "mongoose";

import { Iuser } from "../DBModel/Iuser";
const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        created: {
            type: String,
            required: false,
        },
        updated: {
            type: String,
            required: false,
        },
    },

    { timestamps: true }
);

const User = mongoose.model<Iuser>("User", UserSchema);
export default User;
