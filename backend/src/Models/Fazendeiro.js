const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Fazendeiro = new Schema({
  id: ObjectId,
  nome: String,
  cpf: String,
});

const FazendeiroModel = mongoose.model("fazendeiro", Fazendeiro);

module.exports = FazendeiroModel;
