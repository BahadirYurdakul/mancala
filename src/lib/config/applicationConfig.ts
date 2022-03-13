import dotenv from "dotenv";
dotenv.config();

export const APPLICATION_CONFIG = {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
}

export const GAME_CONFIG = {
    PIT_COUNT_FOR_EACH_PLAYER: Number(process.env.GAME_PIT_COUNT_FOR_EACH_PLAYER),
    STONE_COUNT_FOR_EACH_PIT: Number(process.env.GAME_STONE_COUNT_FOR_EACH_PIT),
}

export const MONGO_CONFIG = {
    MONGO_URL: process.env.MONGO_URI,
    MONGO_OPTIONS: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        socketTimeoutMS: 30000,
        keepAlive: true,
        autoIndex: false,
        retryWrites: true
    },
}