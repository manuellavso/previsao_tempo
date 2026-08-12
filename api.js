/**
 * @fileoverview
 * Funções responsáveis pela comunicação com as APIs da Open-Meteo.
 */


/**
 * Realiza uma requisição HTTP para uma API e processa a resposta.
 *
 * A função verifica se a requisição foi concluída corretamente,
 * trata erros HTTP específicos e converte a resposta para JSON.
 *
 * @param {string} url - URL utilizada na requisição HTTP.
 * @returns {Promise<Object>} Dados retornados pela API em formato JSON.
 * @throws {Error} Quando ocorre um erro na comunicação com a API.
 * @throws {Error} Quando o limite de requisições é excedido.
 *
 * @example
 * const dados = await requisicaoApi("https://exemplo.com/api");
 * console.log(dados);
 */
async function requisicaoApi(url) {

    try {

        const resposta = await fetch(url);

        if (!resposta.ok) {

            if (resposta.status === 429) {
                throw new Error("Limite de requisições excedido.");
            }

            throw new Error("Erro ao consultar a API.");
        }

        return await resposta.json();

    } catch (erro) {

        if (
            erro.message === "Limite de requisições excedido." ||
            erro.message === "Erro ao consultar a API."
        ) {
            throw erro;
        }

        throw new Error("Falha na conexão com a API.");
    }
}


/**
 * Busca os dados geográficos de uma cidade.
 *
 * Utiliza a API de geocodificação da Open-Meteo para localizar
 * uma cidade e obter informações como latitude e longitude.
 *
 * @param {string} cidade - Nome da cidade que será pesquisada.
 * @returns {Promise<Object>} Objeto contendo os dados da cidade encontrada.
 * @throws {Error} Quando o nome da cidade não é informado.
 * @throws {Error} Quando a cidade não é encontrada.
 * @throws {Error} Quando ocorre uma falha na comunicação com a API.
 *
 * @example
 * const localizacao = await buscarLocalizacao("São Paulo");
 *
 * console.log(localizacao.name);
 * console.log(localizacao.latitude);
 * console.log(localizacao.longitude);
 */
async function buscarLocalizacao(cidade) {

    if (!cidade || cidade.trim() === "") {
        throw new Error("Digite o nome de uma cidade.");
    }

    const url =
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;

    const dados = await requisicaoApi(url);

    if (!dados.results || dados.results.length === 0) {
        throw new Error("Cidade não encontrada.");
    }

    return dados.results[0];
}


/**
 * Busca os dados meteorológicos de uma localização.
 *
 * Utiliza a API de previsão da Open-Meteo para obter as condições
 * meteorológicas atuais de acordo com as coordenadas informadas.
 *
 * @param {number} latitude - Latitude da localização em graus decimais.
 * @param {number} longitude - Longitude da localização em graus decimais.
 * @returns {Promise<Object>} Dados meteorológicos retornados pela API.
 * @throws {Error} Quando ocorre uma falha na comunicação com a API.
 * @throws {Error} Quando o limite de requisições da API é excedido.
 * @throws {Error} Quando a resposta da API possui formato inesperado.
 *
 * @example
 * const previsao = await buscarPrevisao(-23.5475, -46.63611);
 *
 * console.log(previsao.current_weather.temperature);
 */
async function buscarPrevisao(latitude, longitude) {

    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    const dados = await requisicaoApi(url);

    if (!dados.current_weather) {
        throw new Error("Formato de resposta inválido.");
    }

    return dados;
}


module.exports = {
    buscarLocalizacao,
    buscarPrevisao
};