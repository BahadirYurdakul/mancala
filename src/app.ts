import express from "express";
import {logger, loggerMiddleware} from "./lib/utils/logging";
import routes from "./routes";
import {connectMongo} from "./lib/utils/mongoUtil";
import {handleErrors} from "./lib/error/errorHandlers";
import {APPLICATION_CONFIG} from "./lib/config/applicationConfig";

// todo test yazmayı unutma.
// todo uygulama düzgün çalışıyor mu oynayıp kontrol et :)

const app = express();
// Adding winston logger middleware for every request.
app.use(loggerMiddleware);
// Convert objects to json.
app.use(express.json());

app.listen(APPLICATION_CONFIG.PORT, async () => {
  logger.info(`App is running at http://${APPLICATION_CONFIG.HOST}:${APPLICATION_CONFIG.PORT}`);
  // Starting mongo db connection. If it fails application will exit.
  await connectMongo();

  // Adding all routes to app.
  routes(app);
  // It will populate errors coming from next() feature and return the error as generic error object.
  handleErrors(app);
});

export { app };