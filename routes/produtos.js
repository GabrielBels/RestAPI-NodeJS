const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// Cria um novo produto
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => { // conecta no BD
        if (error) { return res.status(500).send({ error: error }); }
        conn.query('INSERT INTO produtos (nome, preco) VALUES (?, ?);',
            [req.body.nome, req.body.preco], // os valores de ? e ? são definidos respectivamente neste array
            (error, result, field) => {
                conn.release(); // libera a conexão, para que quando acabar o comando ele não prenda a conexão sem necessidade
                if (error) { return res.status(500).send({ error: error, response: null }); } // se der erro retorna esta mensagem
                const response = {
                    mensagem: 'Produto inserido com sucesso.',
                    produto_criado: {
                        id_produto: result.insertId,
                        nome: req.body.nome,
                        preco: req.body.preco
                    },
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna detalhes de todos os produtos.',
                        url: 'http://localhost:3000/produtos'
                    }
                }
                res.status(201).send(response);
            }
        );
    });
});

// Retorna todos produtos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }); }
        conn.query('SELECT * FROM produtos;', (error, result, field) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error, response: null }); }
            const response = {
                mensagem: 'Consulta realizada com sucesso.',
                quantidade: result.length,
                produtos: result.map(prod => {
                    return {
                        produto: {
                            id_produto: prod.id_produto,
                            nome: prod.nome,
                            preco: prod.preco
                        },
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna detalhes de um produto específico.',
                            url: 'http://localhost:3000/produtos/' + prod.id_produto
                        }
                    }
                }),

            }
            res.status(200).send(response);
        }
        );
    });
});

// Retorna um produto pelo ID informado
router.get('/:id_produto', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }); }
        conn.query('SELECT * FROM produtos WHERE id_produto = ?', req.params.id_produto,
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }); }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhum produto foi encontrado om este ID.'
                    });
                }
                const response = {
                    mensagem: 'Consulta realizada com sucesso.',
                    produto: {
                        id_produto: result[0].id_produto,
                        nome: result[0].nome,
                        preco: result[0].preco
                    },
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna detalhes de todos os produtos.',
                        url: 'http://localhost:3000/produtos/'
                    }
                }
                res.status(200).send(response);
            }
        );
    });

});

// Atualiza um produto pelo ID informado
router.patch('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }); }
        conn.query('SELECT * FROM produtos WHERE id_produto = ?', req.body.id_produto,
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }); }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhum produto foi encontrado om este ID.'
                    });
                } else {
                    mysql.getConnection((error, conn) => {
                        if (error) { return res.status(500).send({ error: error }); }
                        conn.query('UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?',
                            [req.body.nome, req.body.preco, req.body.id_produto],
                            (error, result, field) => {
                                if (error) { return res.status(500).send({ error: error }); }
                                const response = {
                                    mensagem: 'Produto atualizado com sucesso.',
                                    produto_atualizado: {
                                        id_produto: req.body.id_produto,
                                        nome: req.body.nome,
                                        preco: req.body.preco
                                    },
                                    url: {
                                        tipo: 'GET',
                                        descricao: 'Retorna os detalhes do produto atualizado.',
                                        url: 'http://localhost:3000/produtos/' + req.body.id_produto
                                    }
                                }
                                res.status(202).send(response)
                            }
                        );
                    });
                }
            }
        );
    });

});

// Deleta um produto pelo ID informado
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }); }
        conn.query('SELECT * FROM produtos WHERE id_produto = ?', req.body.id_produto,
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }); }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Nenhum produto foi encontrado om este ID.'
                    });
                } else {
                    mysql.getConnection((error, conn) => {
                        if (error) { return res.status(500).send({ error: error }); }
                        mysql.query('DELETE FROM produtos WHERE id_produto = ?', req.body.id_produto,
                            (error, result, field) => {
                                if (error) { return res.status(500).send({ error: error }); }
                                const response = {
                                    mensagem: `Produto ID ${req.body.id_produto} deletado com sucesso.`,
                                    result: result,
                                    request: {
                                        tipo: 'POST',
                                        descricao: 'Insere um produto.',
                                        url: 'http://localhost:3000/produtos'
                                    }
                                }
                                res.status(202).send(response);
                            }
                        );
                    });
                }
            }
        );
    }); 
});
module.exports = router; // exporta o módulo router