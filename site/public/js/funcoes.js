// sessão
function validarSessao(tipoUsuarioPermitido) {
    // aguardar();

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var tipoUsuario = sessionStorage.TIPO_USUARIO;

    // var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        // b_usuario.innerHTML = nome;
        if (tipoUsuario <= tipoUsuarioPermitido) {
            // Tipo de usuário é igual ao tipo de usuário permitido, permitir o acesso à tela
            // Aguarde ou execute outras ações necessárias
        } else {
            // Tipo de usuário não é permitido, redirecionar para uma página de acesso negado ou fazer outra ação apropriada
            window.location = "../acesso-negado.html";
        }
        // finalizarAguardar();
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}


// modal
function mostrarModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "flex";
}

function fecharModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "none";
}

function carregarFuncoesUsuario() {
        logoutItem = `<li class="side-item" onclick="limparSessao()">
                        <a class="side-link">
                            <i class="fa-solid fa-door-open"></i>
                            sair
                        </a>
                        
                    </li>`;

        sideNav.innerHTML += sessionStorage.length > 0 ? logoutItem : ``;
    }

