const express = require("express");

const FazendeiroController = require("./Controllers/FazendeiroController");

const FazendaController = require("./Controllers/FazendaController");
const LeiteController = require("./Controllers/LeiteController");

const router = express.Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const LeitePrecoController = require("./Controllers/LeitePrecoController");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

router.get("/health", (req, res) =>
  res.status(200).send("A rota funcionou!!!")
);

//Fazendeiro
router.get("/fazendeiro", FazendeiroController.listar);
router.post("/fazendeiro", FazendeiroController.cadastro);

//fazenda
router.get("/fazenda", FazendaController.listar);
router.post("/fazenda", FazendaController.cadastro);

//Leite_Produção
router.post("/leite", LeiteController.cadastro);
router.get("/leite", LeiteController.listar);
//Consultas
router.get("/consultaVolDiario/:id/:mes", LeiteController.producaoLeiteDiaria);
router.get("/consultaVolMensal/:id/:mes", LeiteController.producaoLeiteMensal);
router.get("/consultaPrecoMensal/:id/:mes", LeiteController.precoLeiteMensal);
router.get("/consultaPrecoAnual/:id/:ano", LeiteController.precoLeiteAnual);

//Leite_Preco
router.post("/leitePreco", LeitePrecoController.cadastro);
router.get("/leitePreco", LeitePrecoController.listar);

module.exports = router;
