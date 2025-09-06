# Meu Projeto Desaparecidos

### Projeto Prático para o Processo Seletivo Desenvolve MT

Esta é uma Single Page Application (SPA) que consome a API da Polícia Judiciária Civil de Mato Grosso para exibir informações sobre pessoas desaparecidas.

---

## ⚠️ Status do Projeto e Instabilidade da API Externa

> **O código deste projeto foi implementado para cumprir 100% dos requisitos solicitados.**
>
> No entanto, durante o período de desenvolvimento (entre 04/09/2025 e 05/09/2025), a API externa da PJC/MT (`https://abitus-api.geia.vip`) apresentou instabilidade severa, respondendo com erros `403 Forbidden` e `Operation Timeout`.
>
> Por este motivo, **ao executar a aplicação, é provável que ela exiba uma mensagem de erro ao invés dos dados das pessoas desaparecidas.** A operação da aplicação depende exclusivamente da estabilidade do serviço da API externa.

**Para comprovar a funcionalidade completa do código, foi gravado um vídeo de demonstração durante um breve período em que a API esteve acessível.**

**➡️ Link para o Vídeo de Demonstração:** **[COLE AQUI O LINK DO SEU VÍDEO]**

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* **Node.js** (versão 18 ou superior)
* **Docker** (para a opção de execução via container)

### 1. Instalação Local

1.  Clone este repositório:
    ```bash
    git clone [https://github.com/einsteinsf73/MeuProjetoDesaparecidos.git](https://github.com/einsteinsf73/MeuProjetoDesaparecidos.git)
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd MeuProjetoDesaparecidos
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

1.  Na raiz do projeto, construa a imagem Docker:
    ```bash
    docker build -t desaparecidos-mt-app .
    ```
2.  Execute o container a partir da imagem:
    ```bash
    docker run -p 8080:80 desaparecidos-mt-app
    ```
    A aplicação estará disponível em `http://localhost:8080`.

---

## 🔧 Tecnologias Utilizadas

* **React (com Vite):** Biblioteca para construção da interface.
* **CSS Puro:** Para estilização e responsividade, sem uso de frameworks.
* **Axios:** Cliente HTTP para consumir a API.
* **React Router:** Para gerenciamento de rotas na SPA.
* **Docker:** Para containerização da aplicação.

---

## 👤 Dados do Candidato

* **Nome Completo:** Albert Einstein de Souza Freire
* **E-mail:** einsteinsf@gmail.com