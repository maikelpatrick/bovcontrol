const FazendaModel = require("../Models/Fazenda");

class FazendaController {
  async cadastro(req, res) {
    const cadastroFazenda = await FazendaModel.create(req.body);

    return res.status(200).json(cadastroFazenda);
  }

  async listar(req, res) {
    const fazendas = await FazendaModel.find().populate("fazendeiro");

    return res.status(200).json({ fazendas });
  }

  async update() {}

  async delete() {}
}

module.exports = new FazendaController();
