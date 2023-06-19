const jogoModel = require('../models/jogoModel');


function enviar(req, res) {
  const bannerJogo = req.file.filename;

  const { nomeJogo, descJogo, tamanhoJogo, categoriaJogo, idUsuario } = req.body;
  const Jogo = { nomeJogo, descJogo, tamanhoJogo, categoriaJogo, bannerJogo, idUsuario };
  
  jogoModel.salvar(Jogo)
  .then(resultado => {
    res.json(resultado);
    // return jogoModel.SalvarCategoria(nomeJogo, descJogo, idUsuario, categoriaJogo);
  })
  .catch(err => {
    res.status(500).json(err);
  });
}

function listar(req, res) {
  jogoModel.listarDados()
      .then(function (resultado) {
          if (resultado.length > 0) {
              res.status(200).json(resultado);
          } else {
              res.status(204).send("Nenhum resultado encontrado!")
          }
      }).catch(
          function (erro) {
              console.log(erro);
              console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
              res.status(500).json(erro.sqlMessage);
          }
      );
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
  const idJogo = req.params.idJogo;

  jogoModel.buscarJogoPeloId(idJogo)
  .then(resultado => {
    res.json(resultado);
  }).catch(err => {
    res.status(500).send(err);
  });
}

async function interacaoJogo(req, res) {
  const idJogo = req.body.idJogoServer;
  const acao = req.body.acaoServer; // 'curtida' ou 'salvo'
  const idUsuario = req.body.idUsuarioServer;

  try {
    if (acao === 'curtida') {
      await curtirJogo(idUsuario, idJogo);
    } else if (acao === 'salvo') {
      await salvarJogo(idUsuario, idJogo);
    } else {
      res.status(400).json({ error: 'Ação inválida.' });
    }
  } catch (error) {
    console.error('Erro ao interagir com o jogo:', error);
    res.status(500).json({ error: 'Erro ao interagir com o jogo.' });
  }
}

async function curtirJogo(idUsuario, idJogo) {

  try {
    // Cria uma nova interação de curtida
    await jogoModel.curtirJogo(idUsuario, idJogo, 'curtida');

  } catch (error) {
    console.error('Erro ao curtir o jogo:', error);
  }
}

// Função para salvar um jogo
async function salvarJogo(idUsuario, idJogo) {

  try {
    // Cria uma nova interação de salvamento
    await jogoModel.salvarJogo(idUsuario, idJogo, 'salvo');
  } catch (error) {
    console.error('Erro ao salvar o jogo:', error);
  }
}


module.exports = { enviar, 
                  buscarJogoPeloId, 
                  buscarCurtidasPorMes, 
                  buscarCurtidasPorJogo,
                  buscarJogosMaisFamosos,
                  buscarDadosKpi,
                  interacaoJogo,
                  listar
                 }