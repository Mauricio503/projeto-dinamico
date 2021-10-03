const Method = require("../middlewares/methodDataBase");
const IpAcesso = require("../model/cadastro/IpAcesso");
        
class IpAcessoRepository extends Method {
        
    constructor(model = IpAcesso) {
        super(model);
        }
    }
        
        
module.exports = new IpAcessoRepository();