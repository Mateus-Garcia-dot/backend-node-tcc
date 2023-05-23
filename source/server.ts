import express from 'express'
import routes from './routes/routes'
import morgan from 'morgan';
import db from "./configs/mongo-connect"


const PORT = process.env.PORT || 4000
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'

const app = express()

app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
})

routes(app);

app.use((req, res) => res.status(404));

app.listen(PORT, () => console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`));

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => console.log('conexão com o banco feita com sucesso'))
