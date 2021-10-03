const Method = require("../middlewares/methodDataBase");
const Coluna = require("../model/cadastro/Coluna");

class ColunaRepository extends Method {

    constructor(model = Coluna) {
        super(model);
    }
}


module.exports = ColunaRepository;