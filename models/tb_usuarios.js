const db = require('./db');
const bcrypt = require('bcryptjs');

const tb_usuarios = db.sequelize.define('tb_usuarios', {
    username: {
        type: db.Sequelize.TEXT
    },
    senha: {
        type: db.Sequelize.TEXT
    }
});

let username = 'lucaslucenak';
let senha = '123456';

/*tb_usuarios.findOne({where: {username: username}}).then(user => {
    if(user == undefined) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(senha, salt)
        
        tb_usuarios.create({
            username: username,
            senha: hash
        });
    }
    else {
        console.log("Nome deusuário já existente.")
    }
})*/



//tb_usuarios.sync({force: true});

module.exports = tb_usuarios;