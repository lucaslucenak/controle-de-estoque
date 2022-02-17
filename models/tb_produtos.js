const db = require('./db');

const tb_produtos = db.sequelize.define('tb_produtos', {
    produto: {
        type: db.Sequelize.TEXT
    },
    marca: {
        type: db.Sequelize.TEXT
    },
    quantidade: {
        type: db.Sequelize.INTEGER
    },
    categoria: {
        type: db.Sequelize.TEXT
    }
});

/*for(var i = 0; i < 5; i++) {
    tb_produtos.create({
        produto: 'Papel',
        marca: 'nao tem',
        quantidade: 10,
        categoria: 'Papelaria'
    });
}*/


//tb_produtos.sync({force: true});

module.exports = tb_produtos;