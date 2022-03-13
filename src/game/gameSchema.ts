import mongoose, {Document, Schema} from "mongoose";
import {ERROR_MESSAGES} from "../lib/error/errorConstants";
import idValidator from "mongoose-id-validator";
import { Game } from "./gameModels";

const GameSchema: Schema = new Schema(
    {
        players: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Player',
                required: [true, ERROR_MESSAGES.gamePlayerEmpty]
            },
        ],
        board: {
            pits: [[Number]],
            homes: [Number],
        },
        isFinished: { type: Boolean, default: false },
        turnPlayerIndex: { type: Number, min: 0 },
    },
    {
        timestamps: true
    }
);

export interface IGameDoc extends Document, Game {}
// Checking that the referenced players exist in the database.
GameSchema.plugin(schema => idValidator(schema, {message: ERROR_MESSAGES.gamePlayerNotExist}));

const GameDoc = mongoose.model<IGameDoc>('Game', GameSchema);
export { GameDoc };