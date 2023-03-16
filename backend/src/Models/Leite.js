const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Leite = new Schema({
  id: ObjectId,
  qtdLeite: Number,
  mes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  fazenda: {
    type: Schema.Types.ObjectId,
    ref: "fazenda",
  },
});

const LeiteModel = mongoose.model("leite", Leite);

module.exports = LeiteModel;
