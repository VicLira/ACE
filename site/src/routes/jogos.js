const express = require('express');
const router = express.Router();
const upload = require('../config/configUpload'); // ARQUIVO COM A COFIGURAÇÃO DO UPLOAD
const jogoController = require('../controllers/jogoController');

router.get("", (req, res) => {
  res.render("index")
});

// upload.single('foto') vai buscar no json alguma propriedade chamada foto 
router.post('/enviar', upload.single('bannerJogo'), (req, res) => {
  jogoController.enviar(req, res);
});

router.post('/listarDados', (req, res) => {
  jogoController.listar(req, res);
});

router.get('/buscarCurtidasPorMes/:idUsuario', (req, res) => {
  jogoController.buscarCurtidasPorMes(req, res);
});

router.get('/buscarCurtidasPorJogo/:idUsuario', (req, res) => {
  jogoController.buscarCurtidasPorJogo(req, res);
});

router.get('/buscarJogosMaisFamosos/:qtdLinhasVar', (req, res) => {
  jogoController.buscarJogosMaisFamosos(req, res);
});

router.get('/buscarDadosKpi/:idUsuario', (req, res) => {
  jogoController.buscarDadosKpi(req, res);
});

router.get('/buscarJogoPeloId/:idJogo', (req, res) => {
  jogoController.buscarJogoPeloId(req, res);
});

router.post('/interacaoJogo', (req, res) => {
  jogoController.interacaoJogo(req, res);
});


module.exports = router;