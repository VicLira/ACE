const jogoModel = require('../models/jogoModel');


function enviar(req, res) {
  const bannerJogo = req.file.filename;

  const {nomeJogo, descJogo, tamanhoJogo, categoriaJogo, idUsuario} = req.body
  const Jogo = { nomeJogo, descJogo, tamanhoJogo, categoriaJogo, bannerJogo, idUsuario }
  
  jogoModel.salvar(Jogo)
  .then(resultado => {
    res.status(201).send("Jogo criado com sucesso");
  }).catch(err => {
    res.status(500).send(err);
  });
}

function buscarCurtidasPorMes(req, res) {
  const idUsuario = req.params.idUsuario;
  const limite_linhas = 7;
  

  jogoModel.buscarCurtidasPorMes(idUsuario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar ultimos dados dos jogos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarCurtidasPorJogo(req, res) {
  const idUsuario = req.params.idUsuario;
  const limite_linhas = 7;
  

  jogoModel.buscarCurtidasPorJogo(idUsuario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar ultimos dados dos jogos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarJogosMaisFamosos(req, res) {
  const limite_linhas = req.params.qtdLinhasVar;


  jogoModel.buscarJogosMaisFamosos(limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar ultimos dados dos jogos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarDadosKpi(req, res) {
  const idUsuario = req.params.idUsuario;
  const limite_linhas = 2;
  

  jogoModel.buscarDadosKpi(idUsuario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar ultimos dados dos jogos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarJogoPeloId(req, res) {
  console.log(req.params.id);
  jogoModel.buscarJogoPeloId(req.params.id)
  .then(resultado => {
    res.json(resultado);
  }).catch(err => {
    res.status(500).send(err);
  });
}

module.exports = { enviar, 
                  buscarJogoPeloId, 
                  buscarCurtidasPorMes, 
                  buscarCurtidasPorJogo,
                  buscarJogosMaisFamosos,
                  buscarDadosKpi
                 }