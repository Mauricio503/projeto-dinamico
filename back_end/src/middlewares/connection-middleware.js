require('dotenv/config');
const { Pool } = require('pg')

module.exports = async(req, res, next) => {
    
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        schema: (req !== undefined ? req.entidade : 'public')
      })
      req.connetion = pool; 
      next();
};