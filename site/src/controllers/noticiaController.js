const noticiaModel = require('../models/noticiaModel');


function enviar(req, res) {
    const bannerNoticiaFiles = req.files['bannerNoticia'];
    const bannerJogoFiles = req.files['bannerJogo'];

    const bannerNoticia = bannerNoticiaFiles[0].filename;
    const bannerJogo = bannerJogoFiles[0].filename;
  

  const {tituloNoticia, descNoticia, idUsuario} = req.body
  const Noticia = { tituloNoticia, descNoticia, bannerJogo, bannerNoticia, idUsuario }
  
  noticiaModel.salvar(Noticia)
  .then(resultado => {
    res.status(201).send("Notícia criada com sucesso");
  }).catch(err => {
    res.status(500).send(err);
  });
}

function buscarUltimasNoticias(req, res) {
  const limite_linhas = req.params.qtdLinhasVar;

  noticiaModel.buscarUltimasNoticias(limite_linhas)
  .then(resultado => {
    res.json(resultado);
  })
  .catch(err => {
    res.status(500).send("Erro ao buscar notícias");
  });
}

function buscarJogoPeloId(req, res) {
  console.log(req.params.id);
  noticiaModel.buscarJogoPeloId(req.params.id)
  .then(resultado => {
    res.json(resultado);
  }).catch(err => {
    res.status(500).send(err);
  });
}

module.exports = { enviar,
    buscarJogoPeloId,
    buscarUltimasNoticias,
  }