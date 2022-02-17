const db = require('./db');

const tb_categorias = db.sequelize.define('tb_categorias', {
    categoria: {
        type: db.Sequelize.TEXT
    }
});

/*tb_categorias.create({
    categoria: 'Papelaria'
});
tb_categorias.create({
    categoria: 'Informática'
});
tb_categorias.create({
    categoria: 'Limpeza'
});*/

//tb_categorias.sync({force: true});

module.exports = tb_categorias;