var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function cadastrarJogo(req, res) {
    const bannerJogo = req.file.filename;
  
    const {nomeJogo, descJogo, tamanhoJogo, categoriaJogo} = req.body
  
    const jogo = { nomeJogo, descJogo, tamanhoJogo, categoriaJogo, bannerJogo }
    
    jogoModel.cadastrarJogo(jogo)
    .then(resultado => {
      res.status(201).send("jogo postado com sucesso");
    }).catch(err => {
      res.status(500).send(err);
    });
  }

module.exports = {
    cadastrarJogo,
    testar
}