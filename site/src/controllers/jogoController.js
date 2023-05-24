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

function buscarJogoPeloId(req, res) {
  console.log(req.params.id);
  jogoModel.buscarJogoPeloId(req.params.id)
  .then(resultado => {
    res.json(resultado);
  }).catch(err => {
    res.status(500).send(err);
  });
}

module.exports = { enviar, buscarJogoPeloId }