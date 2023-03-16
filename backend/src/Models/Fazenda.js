const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Fazenda = new Schema({
  id: ObjectId,
  nome: String,
  cnpj: String,
  kmDistancia: Number,
  fazendeiro: {
    type: Schema.Types.ObjectId,
    ref: "fazendeiro",
  },
});

const FazendaModel = mongoose.model("fazenda", Fazenda);

module.exports = FazendaModel;
