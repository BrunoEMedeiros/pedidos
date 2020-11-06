const db = require('../database/connection');
const jwt = require('jsonwebtoken');

module.exports = class PedidoController {
  async logar(req, res){
    const { login, senha } = req.body;
    if( login == "adm" && senha == "adm")
    {
      let id = 1;

      var token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 300 // expires in 5min
      });

      return res.json({ auth: true, token: token });

    }else if( login == "bruno" && senha == "bruno")
    {
      let id = 2;

      var token = jwt.sign({ id }, process.env.SECRET);

      return res.json({ auth: true, token: token });
    }

  }
  async todos(request, response) 
  {
    const pedidos = await db('pedidos').select('*');

    response.json(pedidos);
  }

  async create(request, response) {
    const {
      cliente,
      forma_pagamento,
      endereco,
      valor,
    } = request.body;

    const pedidos = {
      cliente,
      forma_pagamento,
      endereco,
      valor,
    };

    const [insertedId] = await db('pedidos').insert(pedidos);

    return response.json({
      id: insertedId,
      ...pedidos,
    });
  }

  async show(request, response) 
  {
    const { id } = request.params;

    const pedidos = await db('pedidos').where('id', id).first();

    if (!pedidos) {
      return response.status(400).json({ message: 'pedidos não encontrado' });
    }

    return response.json(pedidos);
  }

  async delete(request, response) {

    const { id } = request.params;

    const pedidos = await db('pedidos').where('id', id).first();

    if (!pedidos) {
      return response.status(400).json({ message: 'pedidos não encontrado' });
    }

    await db('pedidos').where('id', id).del();

    return response.json({ message: 'Pedido excluido!' });
  }
}
