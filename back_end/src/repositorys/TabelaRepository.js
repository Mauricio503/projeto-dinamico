const Method = require("../middlewares/methodDataBase");
const Tabela = require("../model/cadastro/Tabela");

class TabelaRepository extends Method {

    constructor(model = Tabela) {
        super(model);
    }
}


module.exports = TabelaRepository;