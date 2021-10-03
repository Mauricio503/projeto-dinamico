const ColumnRepository = require("../repositorys/ColumnRepository");        
module.exports = {
    async salvar(req, res) {
        function cb(value){
          res.send(value);
        }
        await new ColumnRepository().create(req,cb,req.body);
    },
    async visualiza(req, res) {
        function cb(value){
          res.send(value);
        }
        const where = "tabela.id="+req.body.id;
        await new ColumnRepository().findBy(req,cb,where);
    },
};