const Method = require("../middlewares/methodDataBase");
const TabelaColunas = require("../model/cadastro/TabelaColunas");

class TabelaColunasRepository extends Method {

    constructor(model = TabelaColunas) {
        super(model);
    }
}


module.exports = TabelaColunasRepository;