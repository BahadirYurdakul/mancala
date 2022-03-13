import mongoose, {Document, Schema} from "mongoose";
import {ERROR_MESSAGES} from "../lib/error/errorConstants";
import {IMove} from "./moveModels";

const MoveSchema: Schema = new Schema(
    {
        fromPitNumber: {
            type: Number,
            required: [true, ERROR_MESSAGES.movePitNumberEmpty],
        },
        _game: {
            type: Schema.Types.ObjectId,
            ref: 'Game',
            required: [true, ERROR_MESSAGES.moveGameInvalid],
        },
        _player: {
            type: Schema.Types.ObjectId,
            ref: 'Player',
            required: [true, ERROR_MESSAGES.movePlayerTypeInvalid]
        },
    },
    {
        timestamps: true
    }
);

export interface IMoveDoc extends IMove, Document{}
const MoveDoc = mongoose.model<IMoveDoc>('Move', MoveSchema);
export { MoveDoc };