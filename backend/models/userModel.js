import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        ID: {
            type: String,
            required: true,
        },
        Owner: {
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
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", UserSchema);
