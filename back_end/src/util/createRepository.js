const fs = require("fs");

module.exports = (data) => {
    const model = data.nome_tabela.substring(0,1).toUpperCase()+data.nome_tabela.substring(1,100)
    if(fs.existsSync(__dirname+'/../repositorys/'+data.modulo+'/'+model+'Repository.js') === false){
        fs.writeFileSync(__dirname+'/../repositorys/'+data.modulo+'/'+model+'Repository.js', `const Method = require("../../middlewares/methodDataBase");
const ${model} = require("../../model/${data.modulo}/${model}");
        
class ${model}Repository extends Method {
        
    constructor(model = ${model}) {
        super(model);
        }
    }
        
        
module.exports = new ${model}Repository();`);
    }
}