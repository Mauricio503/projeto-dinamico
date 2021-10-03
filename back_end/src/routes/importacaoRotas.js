const express = require("express");
const routes = express.Router();
const CriarEstruturaRoute = require("./CriarEstruturaRoute");
const CriarEstruturaJavaRoute = require("./EstruturaJavaRoute");

routes.use(CriarEstruturaRoute);
routes.use(CriarEstruturaJavaRoute);

module.exports = routes;