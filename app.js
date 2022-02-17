/**
 * Módulos instalados:
 * express --save
 * sequelize --save
 * mysql2 --save
 * express-handlebars --save
 * body-parser --save
 */

//Express Import
const express = require('express');
const app = express();
//EJS Import
const ejs = require('ejs');
//BodyParser Import
const bodyParser = require('body-parser');
//DataBase connection
const db = require('./models/db');
//Models Import
const tb_produtos = require('./models/tb_produtos');
const tb_usuarios = require('./models/tb_usuarios');
const tb_categorias = require('./models/tb_categorias');
//Session Import
const session = require('express-session');
//Bcrypt Import
const bcrypt = require('bcryptjs');

const sequelize = require('./models/db.js');
const flash = require('connect-flash');

//const estoqueCRUD = require('./routes/estoqueCRUD');

//Config
    //Sessão
    app.use(session({
        secret: "inventagil",
        resave: true,
        saveUninitialized: true
    }));
    app.use(flash());

    //Sessões
    app.use(session({
        secret: "contagil",
        cookie: {
            maxAge: 3000000
        }
    }));

    //Middlewares
        //Authentication
        const authMiddleware = require('./middlewares/auth');

        app.use((req, res, next) => {
            res.locals.successMsg = req.flash("successMsg");
            res.locals.errorMsg = req.flash("errorMsg");
            next();
        });

    //Template Engines
    app.set('view engine', 'ejs');
    app.use(express.static('public')); //Aceita arquivos estáticos
    app.use("/favicon.ico", express.static('/img/favicon.ico')) //Define o favicon

    //BodyParser
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(bodyParser.json());
    app.use(bodyParser.raw());
    app.use(bodyParser.text());

    //Public
    //app.use(express.static(path.join(__dirname, 'public')));

//Rotas

    //Login
    app.get('/', (req, res) => {
        res.render('login.ejs');
    });
    app.post("/auth", (req, res) => {
        let username = req.body.usernameInput;
        let password = req.body.passwordInput;

        tb_usuarios.findOne({where:{username: username}}).then(user => {
            if(user != undefined) {
                //Validar senha
                let correctPassword = bcrypt.compareSync(password, user.senha)
                if (correctPassword) {
                    req.session.user = {
                        id: user.id,
                        username: user.username
                    }
                    res.redirect('/home');
                }
                else {
                    res.redirect('/');
                }
            }
            else {
                res.redirect('/');
            }
        })
    })

    //Logout
    app.get('/logout', (req, res) => {
        req.session.user = undefined;
        res.redirect('/');
    })

    //Home (OK)
    app.get('/home', authMiddleware, (req, res) => {
        res.render('home.ejs');
    });

    //Página de estoque com todos os produtos (OK)
    app.get('/estoque', authMiddleware, (req, res) => {
        tb_produtos.findAll({order: [['id', 'DESC']]}).then(function(tb_produtos) {
        res.render('estoque.ejs', {produtos: tb_produtos});
        });
    });

    //Rota para estoque filtrado pelo produto (OK)
    app.post('/estoqueFilteredByProduct', authMiddleware, (req, res) => {
        var wantedProduct = req.body.productSearchInput;

        tb_produtos.findAll({
            where: {
                produto: wantedProduct
            }
        }).then(function(tb_produtos) {
            res.render('estoqueFilteredByProduct.ejs', {produtos: tb_produtos});
        });
    });

    //Rota para estoque filtrado pela categoria (negado)
    app.post('/estoqueFilteredByCategory', authMiddleware, (req, res) => {
        var wantedCategory = req.body.categorySearchInput;

        tb_produtos.findAll({
            where: {
                categoria: wantedCategory
            }
        }).then(function(tb_produtos) {
            res.render('estoqueFilteredByCategory.ejs', {produtos: tb_produtos});
        });
    });
    
    //Delete (OK)
    app.get('/estoqueDeletar/:id', authMiddleware, (req, res) => {
        tb_produtos.destroy({where: {id: req.params.id}}).then(function () {
            //res.send("Produto deletado com sucesso.");
        }).catch(function(err) {
            req.flash("errorMsg", "Houve um erro ao excluir o produto.")
        });
        res.redirect('/estoque');
    });

    //Create (OK)
    app.get('/createProduct', authMiddleware, (req, res) => {
        tb_categorias.findAll().then(categories => {
            res.render('createProduct.ejs', {categories: categories});
        })
    });
    app.post("/addProduct", authMiddleware, function (req, res) {
        var productName = req.body.productNameInput;
        var productQuantity = req.body.productQuantityInput;
        var productBrand = req.body.productBrandInput;
        var productCategory = req.body.productCategoryInput;

        tb_produtos.create({
            produto: productName,
            quantidade: productQuantity,
            categoria: productCategory,
            marca: productBrand
        }).then(() => {
            req.flash("successMsg", "Categoria criada com sucesso.")
            res.redirect('/createProduct');
        }).catch(function(err) {
            req.flash("errorMsg", "Houve um erro ao criar produto: " + err)
            res.redirect('/createProduct');
        })
    });

    //Update (OK)
    app.get('/editProduct/:id', authMiddleware, (req, res) => {
        //Preenche os campos
        tb_produtos.findOne({
            where: {
                id: req.params.id
            }
        }).then((tb_produtos) => {
            let productData = tb_produtos;
            res.render('editProduct', {productToEdit: productData})
        });
    });
    app.post('/makeEdition', authMiddleware, (req, res) => {
        var productNameEdited = req.body.productNameEdited;
        var productQuantityEdited = req.body.productQuantityEdited;
        var productBrandEdited = req.body.productBrandEdited;
        var productId = req.body.productId;

        tb_produtos.update({
            produto: productNameEdited,
            quantidade: productQuantityEdited,
            marca: productBrandEdited
        }, {
            where: {
                id: productId
            }
        }).then(() => {
            res.redirect('/estoque');
        })
    });


app.listen(8089, function (err) {
    if (err) {
        req.flash("errorMsg", "Erro ao se conectar. Erro: " + err);
    }
    else {
        console.log("Rodando em: http://localhost:8089");
    }
});
