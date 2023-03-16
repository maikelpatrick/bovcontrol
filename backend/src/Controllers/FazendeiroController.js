const FazendeiroModel = require("../Models/Fazendeiro");

class FazendeiroController {
  async cadastro(req, res) {
    const cadastroFazendeiro = await FazendeiroModel.create(req.body);

    return res.status(200).json(cadastroFazendeiro);
  }

  async listar(req, res) {
    const fazendeiros = await FazendeiroModel.find();

    return res.status(200).json({ fazendeiros });
  }

  async listarPorId() {}

  async update() {}

  async delete() {}
}

module.exports = new FazendeiroController();
