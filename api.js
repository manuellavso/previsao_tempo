async function buscarLocalizacao(cidade) {

    if (!cidade || cidade.trim() === "") {
        throw new Error("Digite o nome de uma cidade.");
    }

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt&format=json`;

    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error("Erro ao consultar a API.");
    }

    const dados = await resposta.json();

    if (!dados.results || dados.results.length === 0) {
        throw new Error("Cidade não encontrada.");
    }

    return dados.results[0];
}

async function buscarPrevisao(latitude, longitude) {

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    const resposta = await fetch(url);

    if (!resposta.ok) {

        if (resposta.status === 429) {
            throw new Error("Limite de requisições excedido.");
        }

        throw new Error("Erro ao consultar a API.");
    }

    const dados = await resposta.json();

    if (!dados.current_weather) {
        throw new Error("Formato de resposta inválido.");
    }

    return dados;
}

module.exports = {
    buscarLocalizacao,
    buscarPrevisao
};