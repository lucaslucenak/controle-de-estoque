const db = require('./db');

const tb_usuarios = db.sequelize.define('tb_usuarios', {
    username: {
        type: db.Sequelize.TEXT
    },
    senha: {
        type: db.Sequelize.TEXT
    }
});

//tb_usuarios.sync({force: true});

module.exports = tb_usuarios;