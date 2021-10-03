require('dotenv/config');
const env = require("./env")
, express = require("express")
, app = express()
, routes = express.Router()
,rotas = require("./routes/importacaoRotas")
, connectionMiddleware = require('./middlewares/connection-middleware')
,bodyParser = require("body-parser")
,cors = require("cors");

routes.get("/test", async(req,res) => {res.send("Testado")});

//libera acesso de qualquer lugar
app.use(cors());

//autenticação por token
app.use(connectionMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(routes);

//rotas
app.use(rotas);

//porta
app.listen(process.env.PORT || 3001);

//tratamento de erros
app.use((error,req,res,next) => {
    console.log(error);
    res.status(500).send(error);
})
