import express, { Response as ExResponse, Request as ExRequest } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import onFinished from "on-finished";
import swaggerUi from "swagger-ui-express";
import logger from './logger/logger';
import * as client from 'prom-client';

const cors = require('cors');

dotenv.config({
  path: path.resolve(__dirname, `../env/${process.env.ENVIRONMENT}.env`)
});

// Create Express server
const router = express();
router.disable("x-powered-by");
// Express configuration
router.set("port", process.env.PORT || 3002);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors({
  origin: ["https://shine-uat.nseindia.com", "https://nse-dev.shinetrace.space","http://localhost:3000", "http://localhost:3700"]
}));

// Create a Registry which registers the metrics
const register = new client.Registry()

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'rbac-service'
})

// Enable the collection of default metrics
client.collectDefaultMetrics({ register })

router.get("/metrics", async function (req, res, next) {
  logger.debug("route, new request path " + req.path);
  res.setHeader('Content-Type', register.contentType);
  return res.end(await register.metrics()); // Return all metrics the Prometheus exposition format
});

router.get("/", function (req, res, next) {
  logger.debug("route, new request path " + req.path);
  return res.status(200).json({ status: "rbac server is Working!" });
});

router.get("/healthz", function (req, res, next) {
  logger.debug("route, new request path " + req.path);
  return res.status(200).json({ status: "rbac server is health is good Working!" });
});

router.get("/livez", function (req, res, next) {
  logger.debug("route, new request path " + req.path);
  return res.status(200).json({ status: "rbac server livez!" });
});

router.get("/readyz", function (req, res, next) {
  logger.debug("route, new request path " + req.path);
  // readyState 1 === connected. Report NOT ready without a live DB so k8s
  // keeps traffic away instead of routing it into guaranteed 500s.
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ status: "not ready: database unavailable" });
  }
  return res.status(200).json({ status: "ready" });
});

router.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  logger.debug("route, new request path " + _req.path);
  return res.send(
    swaggerUi.generateHTML(await import("../../api/dist/swagger.json"))
  );
});

router.use(async function (req, res, next) {

  logger.debug("route, new request path " + req.path);

  onFinished(req, function () {
    // Default logger level is 'debug'
    var level = 'debug';

    // If response status is 40X, logger level becomes 'warn'
    if (res.statusCode >= 400 && res.statusCode < 500) {
      level = 'warn';
    }

    // If response status is 50X, logger level becomes 'error'
    if (res.statusCode >= 500) {
      level = 'error';
    }

    // TODO log the request
  });

  next();
});

export default router;
