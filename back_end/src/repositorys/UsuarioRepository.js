const Connection = require("../database/connection");

module.exports = {
  usuario: async (req) => {
    return Connection(req);
  },
};
