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
                YEAR(Jogo.dtCriacao) AS ano,
		        MONTH(Jogo.dtCriacao) AS mes,
                SUM(Jogo.qtdCurtida) as qtdCurtida FROM Jogo JOIN Colaborador 
			ON idColaborador = fkColaborador
				WHERE idColaborador = ${idUsuario} GROUP BY ano, mes
					LIMIT ${limite_linhas} desc; `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
        YEAR(Jogo.dtCriacao) AS ano,
		MONTHNAME(Jogo.dtCriacao) AS mes,
        SUM(Jogo.qtdCurtida) as qtdCurtida FROM Jogo JOIN Colaborador 
			ON idColaborador = fkColaborador
				WHERE idColaborador = ${idUsuario} GROUP BY ano, mes ORDER BY ano, mes DESC
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
        Jogo.nome as nomeJogo,
        SUM(Jogo.qtdCurtida) as qtdCurtida FROM Jogo JOIN Colaborador 
                ON idColaborador = fkColaborador
                    WHERE idColaborador = ${idUsuario} GROUP BY nomeJogo ORDER BY qtdCurtida DESC
                        LIMIT ${limite_linhas};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
        Jogo.nome as nomeJogo,
        SUM(Jogo.qtdCurtida) as qtdCurtida FROM Jogo JOIN Colaborador 
                ON idColaborador = fkColaborador
                    WHERE idColaborador = ${idUsuario} GROUP BY nomeJogo ORDER BY qtdCurtida DESC
                        LIMIT ${limite_linhas};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarJogosMaisFamosos(limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
        Jogo.idJogo as idJogo,
        Jogo.nome as nomeJogo,
        Jogo.banner as banner,
         SUM(Jogo.qtdSalvo) as qtdSalvo,
        SUM(Jogo.qtdCurtida) as qtdCurtida FROM Jogo JOIN Colaborador 
                ON idColaborador = fkColaborador
					GROUP BY nomeJogo, banner ORDER BY qtdCurtida DESC
                        LIMIT ${limite_linhas};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
        Jogo.idJogo as idJogo,
        Jogo.nome as nomeJogo,
        Jogo.banner as banner,
         SUM(Jogo.qtdSalvo) as qtdSalvo,
        SUM(Jogo.qtdCurtida) as qtdCurtida FROM Jogo JOIN Colaborador 
                ON idColaborador = fkColaborador
					GROUP BY nomeJogo, banner, idJogo ORDER BY qtdCurtida DESC
                        LIMIT ${limite_linhas};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosKpi(idUsuario, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
        SUM(Jogo.qtdCurtida) as qtdCurtidas,
        SUM(Jogo.qtdSalvo) as qtdSalvos FROM Jogo JOIN Colaborador 
                ON idColaborador = fkColaborador
                    WHERE idColaborador = ${idUsuario} LIMIT ${limite_linhas};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
        SUM(Jogo.qtdCurtida) as qtdCurtidas,
        SUM(Jogo.qtdSalvo) as qtdSalvos FROM Jogo JOIN Colaborador 
                ON idColaborador = fkColaborador
                    WHERE idColaborador = ${idUsuario} LIMIT ${limite_linhas};`;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarJogoPeloId(idJogo) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT * FROM Jogo WHERE idJogo = ${idJogo};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT * FROM Jogo WHERE idJogo = ${idJogo};`;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function curtirJogo(idUsuario, idJogo, acao) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `INSERT INTO InteracaoUsuarioJogo (idUsuario, idJogo, acao, dataInteracao) VALUES (${idUsuario}, ${idJogo}, '${acao}', now());`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `INSERT INTO InteracaoUsuarioJogo (idUsuario, idJogo, acao, dataInteracao) VALUES (${idUsuario}, ${idJogo}, '${acao}', now());`;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

  }
  
 function salvarJogo(idUsuario, idJogo, acao) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `INSERT INTO InteracaoUsuarioJogo (idUsuario, idJogo, acao, dataInteracao) VALUES (${idUsuario}, ${idJogo}, '${acao}', now());`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `INSERT INTO InteracaoUsuarioJogo (idUsuario, idJogo, acao, dataInteracao) VALUES (${idUsuario}, ${idJogo}, '${acao}', now());`;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }
  


module.exports = {
    salvar,
    buscarCurtidasPorMes,
    buscarCurtidasPorJogo,
    buscarJogosMaisFamosos,
    buscarDadosKpi,
    buscarJogoPeloId,
    curtirJogo,
    salvarJogo
};