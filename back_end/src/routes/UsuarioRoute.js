const express = require("express");
const routes = express.Router();
const UsuarioController = require("../controllers/UsuarioController");

routes.post("/usuario", UsuarioController.usuario);

module.exports = routes;