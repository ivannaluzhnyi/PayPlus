import express from "express";
import morgan from "morgan";
import cors from "cors";
import mustacheExpress from "mustache-express";
import helmet from "helmet";

import { polyfill } from "es6-promise";
polyfill();
import("isomorphic-fetch");

import RouterManager from "./routes";

const app = express();

import("./database");
import("./lib/schedule");

// views
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/../views");
app.use(express.static(__dirname + "/../public"));

// dependencies
app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// routes
RouterManager(app);

export default app;
