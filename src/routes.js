const express = require('express');

const pedidoController = require('./controllers/PedidoController');

const routes = express.Router();

const pController = new pedidoController();

routes.get('/logar', pController.logar);
routes.get('/pedidos', pController.todos);
routes.get('/pedidos/:id', pController.show);
routes.post('/pedidos/novo',pController.create);
routes.delete('/pedidos/deletar/:id', pController.delete);

module.exports = routes;
