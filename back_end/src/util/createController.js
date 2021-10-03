const fs = require("fs");

module.exports = (data) => {
  const model = data.nome_tabela.substring(0,1).toUpperCase()+data.nome_tabela.substring(1,100)
    if(fs.existsSync(__dirname+'/../controller/'+data.modulo+'/'+model+'Controller.js') === false){
        fs.writeFileSync(__dirname+'/../controller/'+data.modulo+'/'+model+'Controller.js', `const ${model}Repository = require("../../repositorys/${data.modulo}/${model}Repository");        
module.exports = {
    async salvar(req, res) {
      try{
        function cb(value){
          res.send(value);
        }
        await ${model}Repository.create(req,cb,req.body);
      }catch(err){
        res.status(400).send({error:err});
      }
    },
    async visualiza(req, res) {
      try{
        function cb(value){
          res.send(value);
        }
        const where = "id="+req.body.id;
        await ${model}Repository.findBy(req,cb,where);
      }catch(err){
        res.status(400).send({error:err});
      }
    },
    async alterar(req, res) {
      try{
        function cb(value){
          res.send(value);
        }
        const where = "id="+req.body.id;
        await ${model}Repository.update(req,cb,where);
      }catch(err){
        res.status(400).send({error:err});
      }
    },
};`);
    }
}