const express = require("express");
const routes = express.Router();
const CriarEstruturaJavaController = require("../controller/CriarEstruturaJavaController");

routes.post("/criarEstruturaJava",CriarEstruturaJavaController.cria);
module.exports = routes;