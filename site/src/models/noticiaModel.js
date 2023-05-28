var database = require("../database/config");

function salvar(Noticia, idUsuario) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function salvar():",
    Noticia.tituloNoticia,
    Noticia.descNoticia,
    Noticia.bannerNoticia,
    Noticia.bannerJogo
  );

  var instrucao = `
    INSERT INTO Noticia (titulo, descNoticia, dtNoticia, bannerJogo, bannerNoticia) VALUES ('${Noticia.tituloNoticia}', '${Noticia.descNoticia}', now(), '${Noticia.bannerJogo}', '${Noticia.bannerNoticia}');
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);

  return database.executar(instrucao).then(() => {
    var instrucaoBuscarId = `
      SELECT idNoticia FROM Noticia WHERE titulo = '${Noticia.tituloNoticia}' AND descNoticia = '${Noticia.descNoticia}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoBuscarId);

    return database.executar(instrucaoBuscarId).then((resultados) => {
      var idNoticia = resultados[0].idNoticia;

      var instrucaoNoticiaUsuario = `
        INSERT INTO NoticiaUsuario (fkNoticia, fkUsuario) VALUES (${idNoticia}, ${Noticia.idUsuario});
      `;

      console.log("Executando a instrução SQL na tabela NoticiaUsuario: \n" + instrucaoNoticiaUsuario);

      return database.executar(instrucaoNoticiaUsuario);
    });
  });
}

module.exports = {
  salvar,
};
