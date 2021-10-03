const UsuarioRepository = require("../repositorys/UsuarioRepository");

module.exports = {
  async usuario(req,res){
    const resposta = await UsuarioRepository.usuario(req);
    res.send(resposta);
  },
}