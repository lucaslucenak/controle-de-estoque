/**
 * Módulos instalados:
 * express --save
 * sequelize --save
 * mysql2 --save
 * express-handlebars --save
 * body-parser --save
 */

const express = require('express');
const app = express();

const tb_produtos = require('./models/tb_produtos');
const tb_usuarios = require('./models/tb_usuarios');
const db = require('./models/db');
const sequelize = require('./models/db.js');

//const estoqueCRUD = require('./routes/estoqueCRUD');

//Config
    //Template Engines
    const {engine} = require('express-handlebars');
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.use(express.static('public'));

    //BodyParser
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

//Rotas
    //Login
    app.get('/', (req, res) => {
        res.render('login');
    });

    //Home (accesar Estoque e agendador)
    app.get('/home', (req, res) => {
        res.render('home');
    });

    app.get('/estoque', (req, res) => {
            tb_produtos.findAll({order: [['id', 'DESC']]}).then(function(tb_produtos) {
            res.render('estoque', {produtos: tb_produtos});
            })
    });

    app.get('/estoqueFiltradoProduto', (req, res) => {
        //res.send("Teste")
        tb_produtos.findAll({
            where: {
                produto: 'Teclado'
            }
        }).then(function(tb_produtos) {
            res.render('estoqueFiltradoProduto', {produtos: tb_produtos});
        })
    });

    app.get('/estoqueFiltradoCategoria', (req, res) => {
        //res.render('estoqueFiltradoCategoria');
        tb_produtos.findAll({
            where: {
                categoria: 'Papelaria'
            }
        }).then(function (tb_produtos) {
            res.render('estoqueFiltradoCategoria', {produtos: tb_produtos});
        })
    });
    
    //Delete
    app.get('/estoqueDeletar/:id', (req, res) => {
        tb_produtos.destroy({where: {id: req.params.id}}).then(function () {
            //res.send("Produto deletado com sucesso.");
        }).catch(function(err) {
            res.send("Erro ao deletar produto: " + err.message);
        });
        res.redirect('/estoque');
    });

    app.get('/estoqueDeletarFiltradoProduto/:id', (req, res) => {
        tb_produtos.destroy({where: {id: req.params.id}}).then(function () {
            //res.send("Produto deletado com sucesso.");
        }).catch(function(err) {
            res.send("Erro ao deletar produto: " + err.message);
        });
        res.redirect('/estoqueFiltradoProduto');
    });

    app.get('/estoqueDeletarFiltradoCategoria/:id', (req, res) => {
        tb_produtos.destroy({where: {id: req.params.id}}).then(function () {
            //res.send("Produto deletado com sucesso.");
        }).catch(function(err) {
            res.send("Erro ao deletar produto: " + err.message);
        });
        res.redirect('/estoqueFiltradoCategoria');
    });
    
    //Create
    app.get('/estoqueCriar', (req, res) => {
        res.render('estoqueCriar');
    });

    /*app.get('/estoqueAdicionado', (req, res) => {
        res.render('estoqueAdicionado');
    });*/

    app.post("/adicionarProduto", function (req, res) {
        var sucesso = [];
            sucesso.push({texto: 'Produto cadastrado com sucesso.'});
            res.render('estoqueAdicionado', {sucesso: sucesso});
            tb_produtos.create({
                produto: req.body.produto,
                quantidade: req.body.quantidade,
                categoria: req.body.categoria,
                marca: req.body.marca
            }).then(function () {
                res.redirect('/adicionarProduto');
            }).catch(function (erro) {
                res.send("Houve um erro: " + erro);
            })
            console.log(req.body.select);
    });

    app.get('/editarProduto', (req, res) => {
        res.render('editarProduto');
    });


    //Relatório de Operações
    app.get('/relatorioOperacoes', (req, res) => {
        res.render('relatorioOperacoes');
    });

app.listen(8089, function () {
    console.log("Rodando em: http://localhost:8089");
});
