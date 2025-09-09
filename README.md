# Busca de Pessoas Desaparecidas - PJC MT

SPA desenvolvida em Vue.js para consulta, busca e envio de informações sobre pessoas desaparecidas, consumindo a API oficial da Polícia Judiciária Civil de Mato Grosso.


## 1. Tecnologias Utilizadas

- [Vue.js 3](https://vuejs.org/) (JavaScript/TypeScript)
- [Tailwind CSS](https://tailwindcss.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [SweetAlert2](https://sweetalert2.github.io/) (alertas)
- [Vite](https://vitejs.dev/) (build e dev server)
- [Vue Router](https://router.vuejs.org/)
- [Vue The Mask](https://vue-the-mask.github.io/)
- [ESLint](https://eslint.org/) e [Prettier](https://prettier.io/) (padronização de código)

---

## 2. Pré-requisitos

- [Node.js](https://nodejs.org/) >= 20.x (opcional, para desenvolvimento local)
- [Docker](https://www.docker.com/) >= 20.x
- [Docker Compose](https://docs.docker.com/compose/) >= 1.29

---

## 3. Instalação e Execução via Docker

### 3.1. Clonar o Repositório

```sh
git clone https://github.com/einsteinsf73/MeuProjetoDesaparecidos.git
cd MeuProjetoDesaparecidos
```

### 3.2. Rodar o Container

```sh
docker-compose up -d
```

### 3.3. Acessar a Aplicação

Abra o navegador e acesse:  
[http://localhost:5173](http://localhost:5173)


---

## 4. Estrutura do Projeto

```
project-lab/
 frontend/
    src/
       components/      # Componentes Vue
       composebles/     # Hooks/composables para API e lógica
       constants/       # Endpoints e constantes
       layouts/         # Layouts principais
       assets/          # CSS, imagens
       views/           # Páginas da aplicação
       router/          # Rotas Vue Router
       App.vue          # Componente raiz
       main.ts          # Entry point
    Dockerfile           # Dockerfile do frontend
    package.json         # Dependências e scripts
    ...                  # Configurações diversas
 docker-compose.yml       # Orquestração dos containers
 README.md                # Documentação do projeto
```



## 5. Funcionalidades e Notas

- **Responsividade:** Layout adaptado para desktop, tablet e mobile.
- **Paginação:** Cards de pessoas exibidos com paginação dinâmica.
- **Busca:** Filtros por nome, idade, sexo e status (desaparecido/localizado).
- **Envio de Informações:** Modal para envio de dados adicionais sobre o desaparecimento.
- **Tratamento de Erros:** Alertas amigáveis para falhas de requisição, campos obrigatórios e feedback visual.
- **Feedback Visual:** Loader, alertas de sucesso/erro, destaque para status da pessoa.

---

## 6. Contato e Repositório

## 👤 Dados do Candidato

* **Nome Completo:** Albert Einstein de Souza Freire 
* **E-mail:** einsteinsf@gmail.com

