const Method = require("../middlewares/methodDataBase");
const UsuarioIpAcessos = require("../model/cadastro/UsuarioIps");
        
class UsuarioIpAcessosRepository extends Method {
        
    constructor(model = UsuarioIpAcessos) {
        super(model);
        }
    }
        
        
module.exports = new UsuarioIpAcessosRepository();