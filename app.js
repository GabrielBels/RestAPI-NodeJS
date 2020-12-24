const express = require('express');
const app = express();
const routeProdutos = require('./routes/produtos');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false})); // apenas dados simples
app.use(bodyParser.json()); // apenas json

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

app.use('/produtos', routeProdutos);
app.use((req, res) => {
    res.status(200).send('Seja bem-vindo.');
});

module.exports = app;