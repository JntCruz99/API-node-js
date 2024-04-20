const app = require('express')();
const database = require('./data-source')
const consign = require('consign');
const port = 3003;

consign()
    .then('./src/config/middlewares.js')
    .then('./src/controllers')
    .then('./src/config/routes.js')
    .into(app);

app.listen(3003, ()=>{
    console.log(`Api rodando na porta ${port}`);
});

database.initialize().then(async () => {
    console.log("Conectado com o banco de dados")
}).catch(error => console.log(`Erro na conexão com o banco de dados: ${error}`))