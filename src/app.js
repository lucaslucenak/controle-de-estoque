/**
 * Pacotes:
 * Express
 * Sequelize
 * HandleBars
 * BodyParser
 */

const express = require('express');
const app = express();
const {engine} = require('express-handlebars');
const { set } = require('express/lib/application');
const bodyParser = require('body-parser');

const Produtos = require('../models/Produtos');


//Configuration
    //Template Engines
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');

    //BodyParser
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());


//--------------------Rotas--------------------//

    //Rota principal
    app.get("/", (req, res) => {
        res.render('home');
    });

    //Rota para cadastrar produto
    app.get("/cadastroProduto", (req, res) => {
        res.render('formCadastroProduto');
    });

    //Rota de recebimento e criação de produto
    app.post("/receberCadastroProduto", (req, res) => { //app.post só pode ser utilizado se o método post for utilizado
        Produtos.create({
            product: req.body.product,
            quantity: req.body.quantity
        }).then(function() {
            res.redirect('/estoque');
        }).catch(function(err) {
            res.send("Erro: " + err.message);
        });
        
    });

    app.get("/estoque", (req, res) => {
        res.send("Teste")

        /*
        //Erro aqui!
        Produtos.all().then(function(allProtudos) {
            res.render('estoque', {produtos: allProtudos});
        }).catch(function(err) {
            res.send("Erro: " + err.message);
        });*/
    });

//---------------Criar linhas nas tabelas---------------//
/*tb_users.create({
    username: 'admin',
    password: 'admin'
});

tb_products.create({
    product: 'agenda',
    quantity: 10
});*/




app.listen(8083, function() {
    console.log("Rodando o servidor na porta 8083.");
});