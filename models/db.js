const Sequelize = require('sequelize');

//Conexão
const sequelize = new Sequelize('controle_estoque', 'root', '', {
    host: 'localhost',
    dateStrings: "date",
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};
