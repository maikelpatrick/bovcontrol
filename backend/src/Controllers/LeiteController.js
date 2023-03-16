const LeiteModel = require("../Models/Leite");

const FazendaModel = require("../Models/Fazenda");
const LeitePrecoModel = require("../Models/LeitePreco");

const { now } = require("mongoose");

class LeiteController {
  async cadastro(req, res) {
    try {
      const cadastroLeite = await LeiteModel.create(req.body);

      return res.status(200).json(cadastroLeite);
    } catch (error) {
      return res.status(404).json({ message: "Cadastro não realizado" });
    }
  }

  async listar(req, res) {
    const leites = await LeiteModel.find().populate("fazenda");

    return res.status(200).json({ leites });
  }

  async listarPorId(req, res) {
    try {
      const { id } = req.params;
      const leite = await LeiteModel.findById(id);

      if (!leite) {
        return res.status(404).json({ message: "Item não cadastrado!!!" });
      }
      return res.status(200).json(leite);
    } catch (error) {
      return res.status(404).json({ message: "ID informado inválido!!!" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      await LeiteModel.findByIdAndUpdate(id, req.body);

      return res.status(200).json({ message: "Atualizado com sucesso!!!" });
    } catch (error) {
      return res.status(404).json({ message: "ID informado inválido!!!" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const leiteDeletado = await LeiteModel.findByIdAndDelete(id);

      if (!leiteDeletado) {
        return res.status(404).json({ message: "Item não existe" });
      }

      return res.status(200).json({ message: "Deletado com sucesso!!!" });
    } catch (error) {
      return res.status(404).json({ message: "ID informado inválido!!!" });
    }
  }

  async producaoLeiteDiaria(req, res) {
    try {
      const { id } = req.params;
      const { mes } = req.params;
      const fazenda = await FazendaModel.findById(id);

      if (!fazenda) {
        return res.status(404).json({ message: "Fazenda não cadastrada!!!" });
      }
      const ano = 2023;
      const leite = await LeiteModel.find({
        fazenda: id,
        createdAt: {
          $gte: ano + "-" + mes + "-01",
          $lte: ano + "-" + mes + "-31",
        },
      });

      var arr = [];
      leite.forEach((element) => {
        var rv = new Object();
        rv.volLeite = element.qtdLeite;
        rv.dia = element.createdAt.getDay();
        rv.mes = element.createdAt.getMonth() + 1;
        rv.fazenda = fazenda.nome;
        arr.push(rv);
      });

      return res.status(200).json(arr);
    } catch (error) {
      return res.status(404).json({ message: "ID informado inválido!!!" });
    }
  }

  async producaoLeiteMensal(req, res) {
    try {
      const { id } = req.params;
      const { mes } = req.params;
      const fazenda = await FazendaModel.findById(id);

      if (!fazenda) {
        return res.status(404).json({ message: "Fazenda não cadastrada!!!" });
      }

      const leite = await LeiteModel.find({
        fazenda: id,
      });

      var somaMedia = 0;
      var totalDias = [];

      leite.forEach((element) => {
        somaMedia = somaMedia + element.qtdLeite;
        totalDias.push(element.createdAt.getDate());
      });

      const numeros = [...new Set(totalDias)];

      var result = somaMedia / numeros.length;

      var rv = new Object();
      rv.MediaVolumeMensal = result;
      rv.totalDias = numeros.length;
      rv.mes = mes;
      rv.fazenda = fazenda.nome;

      return res.status(200).json(rv);
    } catch (error) {
      return res.status(404).json({ message: "ID informado inválido!!!" });
    }
  }

  async precoLeiteMensal(req, res) {
    try {
      const { id } = req.params;
      const { mes } = req.params;
      const fazenda = await FazendaModel.findById(id);
      var rv = [];
      let ano = 2023;

      if (!fazenda) {
        return res.status(404).json({ message: "Fazenda não cadastrada!!!" });
      }

      var se = 0;
      if (mes < 7) {
        se = 1;
      } else {
        se = 2;
      }

      const leitesprecos = await LeitePrecoModel.find({
        semestre: se,
        ano: ano,
      });

      const leite = await LeiteModel.find({
        fazenda: id,
        createdAt: {
          $gte: ano + "-" + mes + "-01",
          $lte: ano + "-" + mes + "-31",
        },
      });

      var somaLitros = 0;
      leite.forEach((element) => {
        somaLitros = somaLitros + element.qtdLeite;
      });

      var kmfazenda = 0;
      if (somaLitros > 0) {
        const preco1 = leitesprecos[0].precoBase * somaLitros;
        if (fazenda.kmDistancia > 51) {
          kmfazenda = fazenda.kmDistancia * leitesprecos[0].km50plus;
        } else {
          kmfazenda = fazenda.kmDistancia * leitesprecos[0].km50;
        }
        var bonus = 0;
        if (se == 2 && somaLitros > 10000) {
          bonus = leitesprecos[0].bonus * somaLitros;
        }

        const resultado = (preco1 - kmfazenda + bonus) / somaLitros;

        var real = resultado.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        });
        var valorDolar = 5.2;
        var dolar = (resultado / valorDolar).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });

        const pMessal = {
          ano: ano,
          mes: mes,
          cotacaoDolar: valorDolar.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          }),
          precoMensalReal: real,
          precoMensalDolar: dolar,
          fazenda: fazenda.nome,
        };
        console.log(pMessal);
        rv.push(pMessal);
      }
      return res.status(200).json(rv);
    } catch (error) {
      return res.status(404).json({ message: "ID informado inválido!!!" });
    }
  }

  async precoLeiteAnual(req, res) {
    try {
      const { id } = req.params;
      const { ano } = req.params;
      const fazenda = await FazendaModel.findById(id);
      var rv = [];

      if (!fazenda) {
        return res.status(404).json({ message: "Fazenda não cadastrada!!!" });
      }

      for (var i = 1; i <= 12; i++) {
        const leite = await LeiteModel.find({
          fazenda: id,
          createdAt: {
            $gte: ano + "-" + i + "-01",
            $lte: ano + "-" + i + "-31",
          },
        });

        var somaLitros = 0;
        leite.forEach((element) => {
          somaLitros = somaLitros + element.qtdLeite;
        });

        var se = 0;
        if (i < 7) {
          se = 1;
        } else {
          se = 2;
        }

        const leitesprecos = await LeitePrecoModel.find({
          semestre: se,
          ano: ano,
        });

        var kmfazenda = 0;
        if (somaLitros > 0) {
          const preco1 = leitesprecos[0].precoBase * somaLitros;
          if (fazenda.kmDistancia > 51) {
            kmfazenda = fazenda.kmDistancia * leitesprecos[0].km50plus;
          } else {
            kmfazenda = fazenda.kmDistancia * leitesprecos[0].km50;
          }
          var bonus = 0;
          if (se == 2 && somaLitros > 10000) {
            bonus = leitesprecos[0].bonus * somaLitros;
          }

          const resultado = (preco1 - kmfazenda + bonus) / somaLitros;

          var real = resultado.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          });
          var valorDolar = 5.2;
          var dolar = (resultado / valorDolar).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          });

          const pMessal = {
            ano: ano,
            mes: i,
            cotacaoDolar: valorDolar.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            }),
            precoMensalReal: real,
            precoMensalDolar: dolar,
            fazenda: fazenda.nome,
          };

          rv.push(pMessal);
        }
      }
      return res.status(200).json(rv);
    } catch (error) {
      return res.status(404).json({ message: "ID informado inválido!!!" });
    }
  }
}

module.exports = new LeiteController();
