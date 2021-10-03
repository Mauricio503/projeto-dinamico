const DataTypes = require("../enum/TypesColumns");

class Column {
        
    model() {
        return {
            nome: DataTypes.STRING(255)
,           tipo: DataTypes.STRING(255)
        }    
    }
    association() {
        return {
            coluna: DataTypes.LIST
        }    
    }
}
        
module.exports = Column