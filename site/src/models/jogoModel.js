var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function salvar(Jogo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function salvar():", Jogo.nomeJogo, Jogo.descJogo, Jogo.bannerJogo, Jogo.tamanhoJogo);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Jogo (nome, descJogo, banner, dtCriacao, statusJogo, tamanhoJogo, fkColaborador) VALUES ('${Jogo.nomeJogo}', '${Jogo.descJogo}', '${Jogo.bannerJogo}', now(), 0, ${Jogo.tamanhoJogo}, ${Jogo.idUsuario});
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarCurtidasPorMes(idUsuario, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT  
                YEAR(jogo.dtCriacao) AS ano,
		        MONTH(jogo.dtCriacao) AS mes,
                SUM(jogo.qtdCurtida) as qtdCurtida FROM jogo JOIN colaborador 
			ON idColaborador = fkColaborador
				WHERE idColaborador = ${idUsuario} GROUP BY ano, mes
					LIMIT ${limite_linhas} desc; `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT YEAR(jogo.dtCriacao) AS ano,
		MONTHNAME(jogo.dtCriacao) AS mes,
        SUM(jogo.qtdCurtida) as qtdCurtida FROM jogo JOIN colaborador 
			ON idColaborador = fkColaborador
				WHERE idColaborador = 1 GROUP BY ano, mes ORDER BY ano, mes DESC
					LIMIT 7;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarCurtidasPorJogo(idUsuario, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
        jogo.nome as nomeJogo,
        SUM(jogo.qtdCurtida) as qtdCurtida FROM jogo JOIN colaborador 
                ON idColaborador = fkColaborador
                    WHERE idColaborador = ${idUsuario} GROUP BY nomeJogo ORDER BY qtdCurtida DESC
                        LIMIT 7;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
        jogo.nome as nomeJogo,
        SUM(jogo.qtdCurtida) as qtdCurtida FROM jogo JOIN colaborador 
                ON idColaborador = fkColaborador
                    WHERE idColaborador = ${idUsuario} GROUP BY nomeJogo ORDER BY qtdCurtida DESC
                        LIMIT 7;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvar,
    buscarCurtidasPorMes,
    buscarCurtidasPorJogo,
    // listar,
};