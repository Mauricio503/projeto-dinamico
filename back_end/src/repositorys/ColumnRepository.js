const Method = require("../middlewares/methodDataBase");
const Column = require("../model/Column");
        
class ColumnRepository extends Method {
        
    constructor(model = Column) {
        super(model);
        }
    }
        
        
module.exports = ColumnRepository;