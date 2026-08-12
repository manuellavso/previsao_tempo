// Constantes
const inputCidade = document.querySelector("#cidade");
const botaoBuscar = document.querySelector(".search button");

const nomeCidade = document.querySelector(".weather h2");
const temperaturaAtual = document.querySelector(".temperature strong");
const descricaoAtual = document.querySelector(".weather-description");

const previsao = document.querySelector(".weather");
const mensagemErro = document.querySelector(".error-message");

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

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt&format=json`;

    const resposta = await fetch(url);

    const dados = await resposta.json();

    if (!dados.results) {

        mensagemErro.style.display = "block";

        previsao.style.display = "none";

        return;
    }

    const resultado = dados.results[0];

    mensagemErro.style.display = "none";

    const nome = resultado.name;

    const latitude = resultado.latitude;
    const longitude = resultado.longitude;

    nomeCidade.textContent = nome;

    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);

    buscarPrevisao(latitude, longitude);
}

async function buscarPrevisao(latitude, longitude) {

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    const resposta = await fetch(url);

    const dados = await resposta.json();

    const temperatura = dados.current_weather.temperature;

    const codigoTempo = dados.current_weather.weathercode;

    const descricaoTempo = obterDescricaoTempo(codigoTempo);

    descricaoAtual.textContent = descricaoTempo;

    console.log("Temperatura:", temperatura);

    temperaturaAtual.textContent = `${temperatura}°C`;

    previsao.style.display = "block";
}

// Evento ao clicar
botaoBuscar.addEventListener("click", function () {

    const cidade = inputCidade.value.trim();

    if (cidade === "") {

        mensagemErro.textContent = "Digite o nome de uma cidade.";

        mensagemErro.style.display = "block";

        previsao.style.display = "none";

        return;
    }

    mensagemErro.textContent = "Cidade não encontrada. Tente novamente.";

    buscarLocalizacao(cidade);

});

