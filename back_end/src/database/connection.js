const Sequelize = require("sequelize");
const createConnectionConfig = require("../connectionManager");

module.exports = async(req,model) => {
    const con = new Sequelize(createConnectionConfig(req));
    var result = null;
    var resultSlice = null;

    var queryString =
      "select * from usuario";

    await con
      .query(queryString, {
        type: Sequelize.QueryTypes.SELECT,
      })
      .then(
        await function (projects) {
          result = projects;
        }
      )
      .finally(() => {
        con.close();
      });
    return {
      pessoas: result,
    };
}