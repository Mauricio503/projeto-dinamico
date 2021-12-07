const CriarModel = require("../java/createModel");
const CriarRepository = require("../java/createRepository");
const CriarController = require("../java/createController");
const CriarPagina = require("../java/createPage");
const Colunms = require("../enum/TypesColumns");

module.exports = {
  async cria(req, res) {
    /* Exemplo
    {
	"nome_tabela":"entregaBlocoDeNotas",
	"colunas":[
		{"nome":"blocoNotasFiscaisProdutor","nome_tabela":"blocoNotasFiscaisProdutor","tipo":"list", "colunas":[
			{"nome":"data","tipo":"LocalDate", "tamanho":"5"},
			{"nome":"servicoProducaoPrimaria","tipo":"model", "tamanho":"6"},
			{"nome":"quantidade","tipo":"Integer","tamanho":"3"},
			{"nome":"valor","tipo":"BigDecimal","tamanho":"6"},
			{"nome":"valorTotal","tipo":"BigDecimal","tamanho":"6"},
      {"nome":"tipo","tipo":"String", "tamanho":"5"},
		]}
	]
}
    
    */
      
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