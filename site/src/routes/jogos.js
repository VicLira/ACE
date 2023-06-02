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

router.get('/buscarCurtidasPorMes/:idUsuario', (req, res) => {
  jogoController.buscarCurtidasPorMes(req, res);
});

router.get('/buscarCurtidasPorJogo/:idUsuario', (req, res) => {
  jogoController.buscarCurtidasPorJogo(req, res);
});

router.get('/:id', (req, res) => {
  jogoController.buscarJogoPeloId(req, res);
});

module.exports = router;