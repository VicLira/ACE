var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarJogo(nome, descJogo, bannerJogo, tamanhoJogo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarJogo():", nome, descJogo, bannerJogo, tamanhoJogo);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Jogo (nome, descJogo, bannerJogo, dtCriacao, statusJogo, tamanhoJogo) VALUES ('${nome}', '${descJogo}', '${bannerJogo}', 'Now()', '0', '${tamanhoJogo}');
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarJogo,
    listar,
};