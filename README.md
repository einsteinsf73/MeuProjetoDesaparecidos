# Projeto Prático - Frontend Desaparecidos PJC/MT

Esta é uma aplicação Single Page Application (SPA) desenvolvida como parte do processo seletivo da Desenvolve MT. A aplicação consome a API da Polícia Judiciária Civil de Mato Grosso para exibir informações sobre pessoas desaparecidas.

## Meus Dados de Inscrição

* **Nome Completo:** Albert Einstein de Souza Freire
* **CPF:** 024.115.111-24
* **E-mail:** einsteinsf@gmail.com

## Passo a Passo para Instalação e Execução

### Pré-requisitos
* Node.js (versão 18 ou superior)
* Docker

### 1. Instalação Local

1.  Clone este repositório (lembre-se de substituir pela URL do seu repositório no GitHub):
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd meu-projeto-desaparecidos
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Execute a aplicação em modo de desenvolvimento:
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173`.

### 2. Execução com Docker

1.  Faça o build da imagem Docker:
    ```bash
    docker build -t desaparecidos-mt-app .
    ```
2.  Execute o container:
    ```bash
    docker run -p 8080:80 desaparecidos-mt-app
    ```
    A aplicação estará disponível em `http://localhost:8080`.

## Tecnologias Utilizadas

* **React (com Vite):** Biblioteca para construção da interface.
* **CSS Puro:** Para estilização e responsividade.
* **Axios:** Cliente HTTP para consumir a API.
* **React Router:** Para gerenciamento de rotas.
* **Docker:** Para containerização da aplicação.

## STATUS ATUAL DO PROJETO E DA API EXTERNA (Importante)

O código deste projeto foi implementado para cumprir 100% dos requisitos, utilizando exclusivamente a API da PJC/MT em `https://abitus-api.geia.vip`.

No entanto, durante todo o período de desenvolvimento (entre 04/09/2025 e 05/09/2025), a API externa apresentou instabilidade severa, respondendo com erros `403 Forbidden` e `Operation Timeout`, estando efetivamente fora do ar para acesso público.

Por este motivo, ao executar a aplicação, é provável que ela exiba uma mensagem de erro ao invés dos dados.

**Para comprovar a funcionalidade completa do código, foi gravado um vídeo de demonstração durante um breve período em que a API esteve acessível.**

**Link para o Vídeo de Demonstração:** [COLE AQUI O LINK DO SEU VÍDEO]

O código está pronto e funcional. Sua operação depende exclusivamente da estabilidade do serviço da API externa.