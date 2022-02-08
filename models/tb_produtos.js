const db = require('./db');

const tb_produtos = db.sequelize.define('tb_produtos', {
    produto: {
        type: db.Sequelize.TEXT
    },
    quantidade: {
        type: db.Sequelize.INTEGER
    }
});

//tb_produtos.sync({force: true});

module.exports = tb_produtos;