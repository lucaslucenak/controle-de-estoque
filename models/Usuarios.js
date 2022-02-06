const db = require('./db');

const tb_users = db.sequelize.define('tb_users', {
    username: {
        type: db.Sequelize.TEXT
    },
    password: {
        type: db.Sequelize.TEXT
    }
});

module.exports = tb_users;

//Usuarios.sync({force: true}); //Só pode ser executado uma vez