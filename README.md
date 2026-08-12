# 🌤️ Previsão do tempo

<div align="center">
  <img src="https://ik.imagekit.io/iibl43pgxp/pngwing.com%20(1).png" alt="ClimaAqui" width="200"/>
</div>

<p>Aplicação de previsão do tempo utilizando dados meteorológicos.</p>



## 1. Sobre o Projeto 📌

O projeto foi desenvolvido como uma aplicação web simples e responsiva para **consulta de informações meteorológicas**.

O usuário informa o nome de uma cidade e a aplicação realiza uma busca pela localização utilizando a API de geocodificação da Open-Meteo. Após encontrar a cidade, suas coordenadas geográficas são utilizadas para consultar os dados meteorológicos.

O projeto também possui testes automatizados utilizando Jest para verificar o funcionamento das funções responsáveis pela comunicação com as APIs.



#### 1.1 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Node.js
- Jest
- Fetch API
- Open-Meteo API
- Git e GitHub



#### 1.2 API Utilizada 

O projeto utiliza a [Open-Meteo](https://open-meteo.com/) para obter os dados de localização e previsão do tempo.

São utilizadas duas APIs:

1. ***Geocoding** API*: https://geocoding-api.open-meteo.com/

Responsável por encontrar as coordenadas geográficas da cidade informada pelo usuário.

2. ***Forecast** API*: https://api.open-meteo.com/v1/forecast

Responsável por retornar os dados meteorológicos da localização encontrada.



## 2. Como executar o projeto ⚙️

1. Clone o repositório

```
git clone URL_DO_SEU_REPOSITORIO
```

2. Acesse a pasta do projeto

```
cd previsao_tempo
```

3. Instale as dependências

```
npm install
```

4. Abra o projeto

Abra o arquivo `index.html` no navegador ou utilize uma extensão como o Live Server no *Visual Studio Code*.



## 3. Executando testes 🧪

O projeto utiliza o Jest para realizar testes automatizados.

Para executar os testes:

```
npm test
```

Atualmente, os testes verificam cenários como:

- Busca de uma cidade válida;
- Cidade inexistente;
- Entrada vazia;
- Falha da API;
- Limite de requisições;
- Falha de conexão;
- Resposta JSON em formato inesperado.



## 4. Estrutura do projeto 📁

```
previsao_tempo/
│
├── testes/
│   └── api.test.js
│
├── api.js
├── script.js
├── index.html
├── style.css
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```



## 5. Qualidade e tratamento de erros 🧪

A aplicação possui tratamento para diferentes situações, incluindo:

- Entrada de cidade vazia;
- Cidade não encontrada;
- Erros de comunicação com a API;
- Limite de requisições excedido;
- Falhas de conexão;
- Formato inesperado dos dados retornados pela API.

Os testes utilizam *mocks* para simular diferentes respostas da API sem depender de requisições reais durante a execução dos testes.



## 6. Documentação 📚

As principais funções do arquivo `api.js` foram documentadas utilizando o padrão JSDoc.

A documentação descreve:

- Parâmetros;
- Valores retornados;
- Exceções;
- Exemplos de utilização.



## 7. Desenvolvimento 👩‍💻

Projeto desenvolvido como atividade acadêmica utilizando recursos de Inteligência Artificial como apoio no desenvolvimento, revisão, documentação e criação dos testes automatizados.



## 8. Licença e contato📄 

Este projeto foi desenvolvido por  [**Manuella Oliveira**](https://github.com/manuellavso) para fins acadêmicos.

Para dúvidas, sugestões ou colaborações, entre em contato via GitHub ou abra uma issue!

 Obrigada por visitar o projeto!

