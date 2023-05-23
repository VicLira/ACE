var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/jogoController");

// upload.single('foto') vai buscar no json alguma propriedade chamada foto 
router.post('/cadastrarJogo', upload.single('foto'), (req, res) => {
    jogoController.cadastrarJogo(req, res);
  });