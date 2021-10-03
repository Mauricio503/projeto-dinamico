
module.exports = function createConnectionConfig(req) {
  return {
    dialect: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: req.entidade,
    connectionLimit: 10,
    define: {
      timestamps: false,
      underscored: true,
      freezeTableName: true,
    },
    logging: false,
  };
};