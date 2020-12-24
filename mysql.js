// Configurações do Banco de dados MySQL
const mysql = require('mysql');
var pool = mysql.createPool({
    "user": "root", // o valor destas variaveis são setadas no arquivo nodemon.json
    "password": "root",
    "database": "ecommerce",
    "host": "localhost",
    "port": 3306
});

exports.pool = pool;