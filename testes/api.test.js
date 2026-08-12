const { buscarLocalizacao, buscarPrevisao } = require("../api");

describe("buscarPrevisao", () => {

    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    test("deve ser uma função", () => {

        expect(typeof buscarPrevisao).toBe("function");

    });


    test("nome de cidade válido retorna dados meteorológicos", async () => {

        fetch.mockResolvedValue({
            ok: true,
            json: async () => ({
                latitude: -23.5475,
                longitude: -46.63611,
                current_weather: {
                    temperature: 24.5,
                    windspeed: 10.2,
                    winddirection: 180,
                    weathercode: 0,
                    time: "2026-08-12T10:00"
                }
            })
        });

        const resultado = await buscarPrevisao(-23.5475, -46.63611);

        expect(resultado).toBeDefined();

        expect(resultado.current_weather).toBeDefined();

        expect(resultado.current_weather.temperature).toBe(24.5);

        expect(fetch).toHaveBeenCalledTimes(1);

    });

    test("nome de cidade inexistente lança exceção", async () => {

        fetch.mockResolvedValue({
            ok: true,
            json: async () => ({
                results: []
            })
        });

        await expect(
            buscarLocalizacao("CidadeQueNaoExiste123")
        ).rejects.toThrow("Cidade não encontrada.");
    });
    
    test("entrada vazia retorna erro de validação", async () => {

        await expect(
            buscarLocalizacao("")
        ).rejects.toThrow("Digite o nome de uma cidade.");

        expect(fetch).not.toHaveBeenCalled();
    });

    test("falha da API lança uma exceção", async () => {

        fetch.mockResolvedValue({
            ok: false,
            status: 500
        });

        await expect(
            buscarPrevisao(-23.5475, -46.63611)
        ).rejects.toThrow("Erro ao consultar a API.");
    });

    // Teste simula 429 - too many requests
    test("limite de requisições da API lança erro adequado", async () => {

        fetch.mockResolvedValue({
            ok: false,
            status: 429
        });

        await expect(
            buscarPrevisao(-23.5475, -46.63611)
        ).rejects.toThrow("Limite de requisições excedido.");
    });

    test("falha de conexão de rede lança erro adequado", async () => {

        fetch.mockRejectedValue(
            new Error("Falha na conexão com a API.")
        );

        await expect(
            buscarPrevisao(-23.5475, -46.63611)
        ).rejects.toThrow("Falha na conexão com a API.");
    });

    test("formato inesperado da resposta JSON lança erro adequado", async () => {

        fetch.mockResolvedValue({
            ok: true,
            json: async () => ({
                temperatura: 24.5
            })
        });

        await expect(
            buscarPrevisao(-23.5475, -46.63611)
        ).rejects.toThrow("Formato de resposta inválido.");
    });

});