// ELEMENTOS DO HTML
const inputCidade = document.querySelector("#cidade");
const botaoPrevisao = document.querySelector("#btn-previsao");
const botaoVoltar = document.querySelector("#btn-voltar");

const telaPesquisa = document.querySelector(".search-container");
const telaPrevisao = document.querySelector(".weather-container");

const nomeCidade = document.querySelector("#nome-cidade");
const temperaturaAtual = document.querySelector("#temperatura");
const descricaoAtual = document.querySelector("#descricao-clima");

const mensagemErro = document.querySelector(".error-message");

const iconeClima = document.querySelector("#icone-clima");

const ventoAtual = document.querySelector("#vento");
const umidadeAtual = document.querySelector("#umidade");
const visibilidadeAtual = document.querySelector("#visibilidade");
const pressaoAtual = document.querySelector("#pressao");


// Controle de telas
// A tela de previsão começa escondida
telaPrevisao.style.display = "none";


// Descrição do tempo
function obterDescricaoTempo(codigo) {

    if (codigo === 0) {
        return "Ensolarado";
    }

    if (codigo === 1 || codigo === 2 || codigo === 3) {
        return "Nublado";
    }

    if (codigo === 45 || codigo === 48) {
        return "Neblina";
    }

    if (codigo >= 51 && codigo <= 55) {
        return "Garoa";
    }

    if (codigo >= 61 && codigo <= 65) {
        return "Chuva";
    }

    if (codigo >= 71 && codigo <= 75) {
        return "Neve";
    }

    if (codigo === 95 || codigo === 96 || codigo === 99) {
        return "Tempestade";
    }

    return "Condição desconhecida";
}


// Buscar localização
async function buscarLocalizacao(cidade) {

    const url =
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;

    try {

        const resposta = await fetch(url);

        const dados = await resposta.json();

        if (!dados.results || dados.results.length === 0) {

            mensagemErro.textContent =
                "Cidade não encontrada. Tente novamente.";

            mensagemErro.style.display = "block";

            telaPrevisao.style.display = "none";

            return;
        }

        const resultado = dados.results[0];

        const nome = resultado.name;
        const latitude = resultado.latitude;
        const longitude = resultado.longitude;

        console.log("Cidade:", nome);
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

        nomeCidade.textContent = nome;

        mensagemErro.style.display = "none";

        buscarPrevisao(latitude, longitude);

    } catch (erro) {

        console.error(erro);

        mensagemErro.textContent =
            "Não foi possível buscar a cidade. Tente novamente.";

        mensagemErro.style.display = "block";

        telaPrevisao.style.display = "none";
    }
}

// Função para os dias
function obterNomeDia(data, indice) {

    if (indice === 0) {
        return "Hoje";
    }

    const dataObj = new Date(`${data}T12:00:00`);

    const diasSemana = [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado"
    ];

    return diasSemana[dataObj.getDay()];
}

// Ícones
function obterIconeTempo(codigo) {

    if (codigo === 0) {
        return "☀️";
    }

    if (codigo === 1) {
        return "🌤️";
    }

    if (codigo === 2) {
        return "⛅";
    }

    if (codigo === 3) {
        return "☁️";
    }

    if (codigo === 45 || codigo === 48) {
        return "🌫️";
    }

    if (codigo >= 51 && codigo <= 55) {
        return "🌦️";
    }

    if (codigo >= 61 && codigo <= 65) {
        return "🌧️";
    }

    if (codigo >= 71 && codigo <= 75) {
        return "❄️";
    }

    if (codigo === 95 || codigo === 96 || codigo === 99) {
        return "⛈️";
    }

    return "🌤️";
}

// Função que monta os cards
function exibirPrevisaoDiaria(dados) {

    const listaPrevisao =
        document.querySelector("#forecast-list");

    listaPrevisao.innerHTML = "";

    for (let i = 0; i < 5; i++) {

        const data = dados.daily.time[i];

        const temperaturaMaxima =
            Math.round(dados.daily.temperature_2m_max[i]);

        const temperaturaMinima =
            Math.round(dados.daily.temperature_2m_min[i]);

        const codigoTempo =
            i === 0
            ? dados.current_weather.weathercode
            : dados.daily.weathercode[i];

        const descricao =
            obterDescricaoTempo(codigoTempo);

        const icone =
            obterIconeTempo(codigoTempo);

        const nomeDia =
            obterNomeDia(data, i);


        const card =
            document.createElement("div");

        card.classList.add("forecast-card");


        card.innerHTML = `
            <p>${nomeDia}</p>

            <span>${icone}</span>

            <strong>${temperaturaMaxima}°C</strong>

            <small>${temperaturaMinima}°C</small>
        `;


        card.title = descricao;

        listaPrevisao.appendChild(card);
    }
}

// Buscar previsão
async function buscarPrevisao(latitude, longitude) {

    const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m,precipitation,visibility,pressure_msl&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=5`;

    const resposta = await fetch(url);

    const dados = await resposta.json();

    const vento =
        dados.current_weather.windspeed;

    const umidade =
        dados.hourly.relative_humidity_2m[0];

    const visibilidade =
        dados.hourly.visibility[0];

    const pressao =
        dados.hourly.pressure_msl[0];

    
    ventoAtual.textContent =
        `${Math.round(vento)} km/h`;

    umidadeAtual.textContent =
        `${Math.round(umidade)}%`;

    visibilidadeAtual.textContent =
        `${(visibilidade / 1000).toFixed(1)} km`;

    pressaoAtual.textContent =
        `${Math.round(pressao)} hPa`;
    

    exibirPrevisaoDiaria(dados);

    const temperatura =
        dados.current_weather.temperature;

    const codigoTempo =
        dados.current_weather.weathercode;

    const descricaoTempo =
        obterDescricaoTempo(codigoTempo);

    const icone =
    obterIconeTempo(codigoTempo);

    iconeClima.textContent = icone;

    console.log("Temperatura:", temperatura);

    temperaturaAtual.textContent =
        `${temperatura}°C`;

    descricaoAtual.textContent =
        descricaoTempo;

    // Mostra a tela de previsão
    telaPesquisa.style.display = "none";
    telaPrevisao.style.display = "block";
}


// Botão ver previsão
botaoPrevisao.addEventListener("click", function () {

    const cidade = inputCidade.value.trim();

    if (cidade === "") {

        mensagemErro.textContent =
            "Digite o nome de uma cidade.";

        mensagemErro.style.display = "block";

        telaPrevisao.style.display = "none";

        return;
    }

    mensagemErro.style.display = "none";

    buscarLocalizacao(cidade);
});


// Botão nova pesquisa
botaoVoltar.addEventListener("click", function () {

    telaPrevisao.style.display = "none";

    telaPesquisa.style.display = "flex";

    inputCidade.value = "";
});


// MODO DIA / NOITE
function atualizarModoTela() {

    const horaAtual = new Date().getHours();

    if (horaAtual >= 6 && horaAtual < 18) {

        document.body.classList.add("modo-dia");
        document.body.classList.remove("modo-noite");

        console.log("Modo dia ativado.");

    } else {

        document.body.classList.add("modo-noite");
        document.body.classList.remove("modo-dia");

        console.log("Modo noite ativado.");

    }
}

// Executa ao carregar a página
atualizarModoTela();
