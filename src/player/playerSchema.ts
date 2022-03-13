import mongoose, {Document, Schema} from "mongoose";
import {ERROR_MESSAGES} from "../lib/error/errorConstants";
import {IPlayer} from "./playerModel";

const PlayerSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, ERROR_MESSAGES.playerNameRequired],
            maxlength: [100, ERROR_MESSAGES.playerNameMaxLength],
        },
        age: {
            type: Number,
        },
    },
    {
        timestamps: true
    }
);

export interface IPlayerDoc extends IPlayer, Document{}
const PlayerDoc = mongoose.model<IPlayerDoc>('Player', PlayerSchema);
export { PlayerDoc };