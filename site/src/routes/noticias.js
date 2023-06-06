const express = require('express');
const router = express.Router();
const upload = require('../config/configUploadNoticias'); // ARQUIVO COM A COFIGURAÇÃO DO UPLOAD
const noticiasController = require('../controllers/noticiaController');

router.get("", (req, res) => {
  res.render("index")
});

// upload.single('foto') vai buscar no json alguma propriedade chamada foto 
router.post('/enviar', upload.fields([{name: 'bannerNoticia'}, {name: 'bannerJogo'}]), (req, res) => {
  noticiasController.enviar(req, res);
});

router.get('/buscarUltimasNoticias/:qtdLinhasVar', (req, res) => {
  noticiasController.buscarUltimasNoticias(req, res);
});

router.get('/:id', upload.single('bannerJogo'), (req, res) => {
  noticiasController.buscarJogoPeloId(req, res);
});

module.exports = router;