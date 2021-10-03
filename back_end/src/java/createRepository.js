const fs = require("fs");

module.exports = (data) => {
    const model = data.nome_tabela.substring(0,1).toUpperCase()+data.nome_tabela.substring(1,100)
        fs.writeFileSync(__dirname+'/documentos/'+model+'Repository.java', `
        
        public interface ${model}Repository extends JpaRepository<${model}, Long> {

        }`);
    }