const Sequelize = require('sequelize');

//Sequelize
const sequelize = new Sequelize('db_controleDeEstoque', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

/*sequelize.authenticate().then(function() {
    console.log('Conectado ao banco de dados com sucesso.')
}).catch(function(err) {
    console.log('Error: ' + err.message);
});*/

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};