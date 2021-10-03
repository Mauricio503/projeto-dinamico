const { Model, DataTypes } = require('sequelize');

class entidade extends Model {
    static init(sequelize) {
        super.init({
            descricao: DataTypes.STRING,
            nome: DataTypes.STRING,
        }, {
            sequelize
        })
    }
}

module.exports = entidade;
