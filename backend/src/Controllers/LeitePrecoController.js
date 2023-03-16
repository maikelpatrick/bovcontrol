const LeitePrecoModel = require("../Models/LeitePreco");

class LeitePrecoController {
  async cadastro(req, res) {
    const cadastroLeitePreco = await LeitePrecoModel.create(req.body);

    return res.status(200).json(cadastroLeitePreco);
  }

  async listar(req, res) {
    const LeitePrecos = await LeitePrecoModel.find();

    return res.status(200).json({ LeitePrecos });
  }

  async listarPorId() {}

  async update() {}

  async delete() {}
}

module.exports = new LeitePrecoController();
