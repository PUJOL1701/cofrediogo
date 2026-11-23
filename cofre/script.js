
const senhaInput = document.getElementById("senha");
const tentarBtn = document.getElementById("tentarBtn");
const reiniciarBtn = document.getElementById("reiniciarBtn");

const mensagem = document.getElementById("mensagem");
const tentativasTexto = document.getElementById("tentativas");
const alerta = document.getElementById("alerta");

const imagemCofre = document.getElementById("imagemCofre");
const overview = document.getElementById("overview");

const tituloResultado = document.getElementById("tituloResultado");
const resultado = document.getElementById("resultado");
const jogarNovamente = document.getElementById("jogarNovamente");
const iconeResultado = document.getElementById("iconeResultado");

const indicadores = document.querySelectorAll(".ponto");
const cofre = document.querySelector(".cofre");

let senhaSecreta;
let tentativas;
let jogoAtivo;

const totalTentativas = 9;

// INICIAR JOGO
function iniciarJogo() {
    senhaSecreta = Math.floor(Math.random() * 150) + 1;

    tentativas = 0;
    jogoAtivo = true;

    senhaInput.value = "";
    senhaInput.disabled = false;
    tentarBtn.disabled = false;

    mensagem.textContent = "Aguardando combinação...";
    mensagem.style.color = "#c9a65c";
    mensagem.classList.remove("sucesso");

    tentativasTexto.textContent = "Tentativas restantes: 9";

    alerta.textContent = "";
    alerta.classList.remove("alerta-final");

    imagemCofre.src = "imagens/cofre-fechado.png";
    cofre.classList.remove("aberto");

    indicadores.forEach(function(ponto) {
        ponto.classList.remove("perdido");
        ponto.classList.add("ativo");
    });

    overview.style.display = "none";

    console.log("Senha secreta:", senhaSecreta);
}

// ATUALIZAR INDICADORES
function atualizarIndicadores() {
    indicadores.forEach(function(ponto, indice) {
        if (indice < tentativas) {
            ponto.classList.remove("ativo");
            ponto.classList.add("perdido");
        } else {
            ponto.classList.remove("perdido");
            ponto.classList.add("ativo");
        }
    });
}

// VERIFICAR SENHA
function tentarAbrir() {
    if (!jogoAtivo) return;

    const valor = senhaInput.value;
    const numero = Number(valor);

    if (valor.trim() === "") {
        mensagem.textContent = "Digite uma senha primeiro!";
        return;
    }

    if (!Number.isInteger(numero) || numero < 1 || numero > 150) {
        mensagem.textContent = "Digite um número entre 1 e 150!";
        return;
    }

    tentativas++;

    const restantes = totalTentativas - tentativas;

    tentativasTexto.textContent =
        "Tentativas restantes: " + restantes;

    atualizarIndicadores();

    // SENHA CORRETA
    if (numero === senhaSecreta) {
        abrirCofre();
        return;
    }

    // DICAS
    if (numero < senhaSecreta) {
        mensagem.textContent = "A senha é maior!";
        mensagem.style.color = "#c9a65c";
    } else {
        mensagem.textContent = "A senha é menor!";
        mensagem.style.color = "#c9a65c";
    }

    // ALERTA DE DUAS TENTATIVAS
    if (restantes === 2) {
        alerta.textContent =
            "⚠ ATENÇÃO! RESTAM APENAS 2 TENTATIVAS!";

        alerta.classList.add("alerta-final");
    }

    // FIM DAS TENTATIVAS
    if (tentativas >= totalTentativas) {
        perderJogo();
    }

    senhaInput.value = "";
}

// ABRIR COFRE
function abrirCofre() {
    jogoAtivo = false;

    imagemCofre.src = "imagens/cofre-aberto.png";
    cofre.classList.add("aberto");

    senhaInput.disabled = true;
    tentarBtn.disabled = true;

    mensagem.textContent = "✦ COFRE DESBLOQUEADO! ✦";
    mensagem.classList.add("sucesso");

    alerta.textContent = "";

    // Não mostra a janela por cima do cofre
    overview.style.display = "none";
}

// PERDER JOGO
function perderJogo() {
    jogoAtivo = false;

    senhaInput.disabled = true;
    tentarBtn.disabled = true;

    alerta.textContent = "";

    iconeResultado.textContent = "🔒";
    tituloResultado.textContent = "ACESSO NEGADO!";

    resultado.textContent =
        "Suas 9 tentativas acabaram! A senha secreta era " +
        senhaSecreta +
        ". Tente novamente!";

    overview.style.display = "flex";
}

// EVENTOS DOS BOTÕES
reiniciarBtn.addEventListener("click", iniciarJogo);

jogarNovamente.addEventListener("click", iniciarJogo);

tentarBtn.addEventListener("click", tentarAbrir);

// PERMITIR USAR ENTER
senhaInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        tentarAbrir();
    }
});

// COMEÇAR AUTOMATICAMENTE
iniciarJogo();
