import errorHandler from "errorhandler";
import app from "./router";
import { RegisterRoutes } from './routes/routes';

if (process.env.NODE_ENV === 'dev') {
  // only use in development
  app.use(errorHandler())
}

RegisterRoutes(app);
/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
// export default httpsServer;
