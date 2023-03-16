const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const LeitePreco = new Schema({
  id: ObjectId,
  precoBase: Number,
  semestre: Number,
  ano: Number,
  km50: Number,
  km50plus: Number,
  bonus: Number,
});

const LeitePrecoModel = mongoose.model("leitePreco", LeitePreco);

module.exports = LeitePrecoModel;
