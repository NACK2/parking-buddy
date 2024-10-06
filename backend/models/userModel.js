import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        _iD: {
            type: ObjectId,
            required: true,
        },
        owner: {
            type: Boolean,
            required: true,
        },
        Group: {
            type: Array,
            required: true,
        },
        ParkingLot: {
            type: Array,
            required: true,
        }
    }
);

export const User = mongoose.model("User", UserSchema);
