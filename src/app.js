const express = require('express');
const app = express();

const Sequelize = require('sequelize');
const sequelize = new Sequelize('db_controleDeEstoque', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(function() {
    console.log('Conectado ao banco de dados com sucesso.')
}).catch(function(err) {
    console.log('Error: ' + err.message);
});

//---------------Criando tabelas---------------
const tb_users = sequelize.define('tb_users', {
    username: {
        type: Sequelize.TEXT
    },
    password: {
        type: Sequelize.TEXT
    }
});
//tb_users.sync({force: true}); //Só pode ser executado uma vez

const tb_products = sequelize.define('tb_products', {
    product: {
        type: Sequelize.TEXT
    },
    quantity: {
        type: Sequelize.INTEGER
    }
});
//tb_products.sync({force: true}); //Só pode ser executado uma vez

//---------------Criar linhas nas tabelas---------------
/*tb_users.create({
    username: 'admin',
    password: 'admin'
});

tb_products.create({
    product: 'agenda',
    quantity: 10
});*/


app.get("/", (req, res) => { //Rota principal
    res.send("Página inicial do app");
});

app.listen(8083, function() {
    console.log("Rodando o servidor na porta 8083.");
});