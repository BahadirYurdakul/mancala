import {Express, Request, Response} from "express";
import {playerRoutes} from "./player/playerRoutes";
import {gameRoutes} from "./game/gameRoutes";
import {moveRoutes} from "./move/moveRoutes";

function routes(app: Express) {
  // Health check endpoint added to be able to control app healthiness. (cloud, prometheus, grafana etc.)
  app.get("/healthcheck", (req: Request, res: Response) => res.status(200).json({status: 'OK'}));

  // Adding player related routes to application.
  playerRoutes(app);

  // Adding game related routes to application.
  gameRoutes(app);

  // Adding move related routes to application.
  moveRoutes(app);
}

export default routes;
