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

//Config
    //Template Engines
    const {engine} = require('express-handlebars');
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.use(express.static('public'))

    //BodyParser
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());


//Rotas
    //Login
    app.get('/', (req, res) => {
        res.render('login');
    });

    //Home
    app.get('/home', (req, res) => {
        res.render('home');
    });

    //Exibição do Estoque
    app.get('/estoque', (req, res) => {
        tb_produtos.findAll({order: [['id', 'DESC']]}).then(function(tb_produtos) {
        res.render('estoque', {produtos: tb_produtos});
        })
    });

    //Delete
    app.get('/estoqueDeletar/:id', (req, res) => {
        tb_produtos.destroy({where: {'id': req.params.id}}).then(function () {
            res.send("Produto deletado com sucesso.");
        }).catch(function(err) {
            res.send("Erro ao deletar produto: " + err.message);
        });
    });

    //Create
    app.get('/estoqueCriar', (req, res) => {
        res.send("Página de cadastro de produto.");
    });

    //Operar no Estoque (Atualizar, Excluir e Criar)
    //Acredito que não precisa dessa rota, já inclui o CRUD em '/estoque' mesmo
    app.get('/operarEstoque', (req, res) => {
        res.render('operarEstoque');
    });

    //Relatório de Operações
    app.get('/relatorioOperacoes', (req, res) => {
        res.render('relatorioOperacoes');
    });


app.listen(8083, function () {
    console.log("Rodando em: http://localhost:8083")
});
