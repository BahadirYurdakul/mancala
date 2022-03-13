import {ObjectId} from 'mongoose';

export interface IMove {
    fromPitNumber: number,
    _player: ObjectId,
    _game: ObjectId,
}