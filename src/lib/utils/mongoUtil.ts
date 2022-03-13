import mongoose from "mongoose";
import {logger} from "./logging";
import {MONGO_CONFIG} from '../config/applicationConfig';

/**
 * To connect mongo db by using mongoose library.
 * If it cannot be connected to Mongo, then it will exit current process.
 */
export async function connectMongo() {
    try {
        await mongoose.connect(MONGO_CONFIG.MONGO_URL || '', MONGO_CONFIG.MONGO_OPTIONS);
        logger.info("Mongo db connected.")
    } catch (error) {
        logger.error(`Could not connect to mongo db. Error: ${error}`);
        process.exit(1);
    }
}