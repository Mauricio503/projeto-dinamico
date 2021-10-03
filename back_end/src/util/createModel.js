const fs = require("fs");

const List = t => ({
    'character varying':"STRING",
    'integer':"INTEGER",
    "lg":"",
    "lt":"LIST",
    "boolean":"BOOLEAN",
    "ligacao":"LIGACAO",
    "date":"DATE",
    "numeric":"BIGDECIMAL"
})[t]

module.exports = (data) => {
    const model = data.nome_tabela.substring(0,1).toUpperCase()+data.nome_tabela.substring(1,100)
    if(fs.existsSync(__dirname+'/../model/'+data.modulo+'/'+model+'.js') === false){
        fs.writeFileSync(__dirname+'/../model/'+data.modulo+'/'+model+'.js', `const DataTypes = require("../../enum/TypesColumns");

class ${model} {
        
    model() {
        return {
            ${data.colunas.filter(c => c.tipo !== "lg" && c.tipo !== "lt").map((c,i) => {
                return (i === 0 ? "":"           ")+ c.nome+": DataTypes."+List(c.tipo)+
                (c.tamanho !== null && c.escala === null? `(${c.tamanho})`:"")+
                (c.tamanho !== null && c.escala !== null ? `(${c.tamanho},${c.escala})`:"")+
                (i+1 === data.colunas.length ? "" :"\n");
            })}
        }    
    }
    association() {
        return {
            ${data.colunas.filter(c => c.tipo === "lg" || c.tipo === "lt").map((a,i) => {
                return (i === 0 ? "":"           ")+a.tabela_ligacao+": DataTypes."+List(a.tipo)+(i+1 === data.colunas.filter(c => c.tipo === "lg" || c.tipo === "lt").length ? "" :"\n");
            })}
        }    
    }
}
        
module.exports = ${model}`);
    }
}