var database = require("../database/config.js")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM Usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha, telefone, dtNasc) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    var instrucaoUsuario = `
        INSERT INTO Usuario (nome, email, senha, telefone, dtNasc, fkTipoUsuario) VALUES ('${nome}', '${email}', '${senha}', '${telefone}', '${dtNasc}', 2);
    `;

    console.log("Executando a instrução SQL na tabela usuario: \n" + instrucaoUsuario);

    return database.executar(instrucaoUsuario)
        .then(() => {
            var instrucaoObterIdUsuario = `
                SELECT idUsuario FROM Usuario WHERE email = '${email}';
            `;

            console.log("Executando a instrução SQL para obter o ID do usuário: \n" + instrucaoObterIdUsuario);

            return database.executar(instrucaoObterIdUsuario);
        })
        .then((resultados) => {
            var idUsuario = resultados[0].idUsuario;

            var instrucaoColaborador = `
                INSERT INTO Colaborador (fkUsuario) VALUES (${idUsuario});
            `;

            console.log("Executando a instrução SQL na tabela colaborador: \n" + instrucaoColaborador);

            return database.executar(instrucaoColaborador);
        });
}




module.exports = {
    entrar,
    cadastrar,
    listar,
};