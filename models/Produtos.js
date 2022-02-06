const db = require('./db');

const tb_products = db.sequelize.define('tb_products', {
    product: {
        type: db.Sequelize.TEXT
    },
    quantity: {
        type: db.Sequelize.INTEGER
    }
});

//Produtos.sync({force: true}); //Só pode ser executado uma vez

module.exports = tb_products;

