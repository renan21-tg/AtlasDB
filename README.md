# AtlasDB

O **AtlasDB** é uma aplicação Fullstack para gerenciamento e exploração de informações geográficas. O sistema permite o cadastro, visualização, edição e remoção de Continentes, Países e Cidades, integrando-se a APIs externas para fornecer dados em tempo real, como informações climáticas e bandeiras.

## 🚀 Tecnologias Utilizadas

### Backend
* **Node.js** & **Express**: Servidor e API REST.
* **TypeScript**: Tipagem estática para maior segurança e manutenção.
* **Prisma ORM**: Interação com o banco de dados.
* **PostgreSQL**: Banco de dados relacional.
* **Integrações Externas**:
    * [OpenWeatherMap](https://openweathermap.org/): Para dados climáticos das cidades.
    * [RestCountries](https://restcountries.com/): Para dados demográficos e bandeiras dos países.

### Frontend
* **React** (via Vite): Biblioteca para construção da interface.
* **TypeScript**: Desenvolvimento tipado no frontend.
* **Tailwind CSS**: Estilização utilitária e responsiva.
* **Axios**: Cliente HTTP para comunicação com a API.
* **React Router DOM**: Gerenciamento de rotas.
* **Heroicons**: Ícones da interface.

---

## ⚙️ Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (Versão 18 ou superior recomendada).
* [PostgreSQL](https://www.postgresql.org/) (Rodando localmente ou via Docker).
* Uma chave de API do [OpenWeatherMap](https://openweathermap.org/api) (Gratuita).

---

## 🛠️ Instalação e Configuração

Siga os passos abaixo para rodar o projeto localmente.

### 1. Configurando o Backend

1.  Acesse a pasta do backend:
    ```bash
    cd Backend
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Crie um arquivo `.env` na raiz da pasta `Backend` e configure as variáveis de ambiente (baseado no `schema.prisma` e serviços):
    ```env
    # URL de conexão com o PostgreSQL (exemplo local)
    DATABASE_URL="postgresql://usuario:senha@localhost:5432/atlasdb?schema=public"

    # Chave da API OpenWeatherMap (necessária para cadastro de cidades)
    API_KEY="sua_chave_api_aqui"
    ```

4.  Execute as migrações do Prisma para criar as tabelas no banco de dados:
    ```bash
    npx prisma migrate dev --name init
    ```

5.  Inicie o servidor:
    ```bash
    npm run dev
    ```
    *O servidor rodará em `http://localhost:3000`*.

### 2. Configurando o Frontend

1.  Em um novo terminal, acesse a pasta do frontend:
    ```bash
    cd Frontend
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Inicie a aplicação web:
    ```bash
    npm run dev
    ```
    *A aplicação geralmente rodará em `http://localhost:5173`*.

---

## 🖥️ Funcionalidades

### 🌍 Continentes
* Listagem, Cadastro, Edição e Remoção.
* **Filtros**: Busca por nome.
* **Ordenação**: Por ID (Criação) ou Ordem Alfabética.

### 🏳️ Países
* Integração automática para buscar bandeira, população e área via API externa ao cadastrar.
* **Filtros**: Busca por nome e filtro por Continente.
* **Ordenação**: Por População, Área, Nome ou Cadastro.

### 🏙️ Cidades
* Integração automática para buscar coordenadas (latitude/longitude) ao cadastrar.
* **Clima**: Visualização em tempo real da temperatura, umidade e vento da cidade selecionada.
* **Filtros**: Busca por nome e filtro por País.

---

