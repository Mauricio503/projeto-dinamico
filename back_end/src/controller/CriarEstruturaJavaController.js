const CriarModel = require("../java/createModel");
const CriarRepository = require("../java/createRepository");
const CriarController = require("../java/createController");
const CriarPagina = require("../java/createPage");
const Colunms = require("../enum/TypesColumns");

module.exports = {
  async cria(req, res) {
    
      
      CriarModel(req.body);
      CriarRepository(req.body);
      CriarController(req.body);
      CriarPagina(req.body);

      req.body.colunas.map(e => {
        if(e.tipo === "list"){
          CriarModel(e);
          CriarRepository(e);
        }
      });
      res.send("fechou");
  }
};