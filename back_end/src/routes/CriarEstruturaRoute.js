const express = require("express");
const routes = express.Router();
const CriarEstruturaController = require("../controller/CriarEstruturaController");

routes.post("/criarEstrutura",CriarEstruturaController.cria);
routes.post("/retornaErro",(req,res,next) => {
    const error = new Error({erro:"mensagem"});
    return next(error)});

module.exports = routes;