# <p align="center">Projeto App de Receitas</p>

## Contexto

Esse é um projeto em grupo, o objetivo é desenvolver um sistema versátil que permita aos usuários explorar, buscar, filtrar, favoritar, compartilhar e acompanhar o processo de preparação de receitas e drinks. Utilizaremos duas APIs distintas, uma para comidas e outra para bebidas, garantindo uma ampla variedade de opções para os usuários. O layout foi projetado com foco em dispositivos **móveis apenas** (360px de largura por 640px de altura).

<details>

<summary><strong>Rode o projeto localmente</strong></summary><br>

> ⚠️ É preciso ter o [Node](https://nodejs.org/en) instalado em sua máquina.

Primeiro, clone o repositório:

```SHELL
git clone git@github.com:mairess/project-recipes-app-ts.git
```

Instale as dependências:

```SHELL
npm install
```

Inicie o vite server:

```SHELL
npm run dev
```

### Os testes

Rode os testes com:

```SHELL
npm test
```

Rode um teste específico:

```SHELL
npm test RecipeDetails
```

Rode a cobertura dos testes:

```SHELL
npm run coverage
```

</details>

<details>

<summary><strong>Rode o projeto com o docker</strong></summary><br>

> ⚠️ É preciso ter o [Docker](https://www.docker.com/get-started/) instalado em sua máquina.

Primeiro, clone o repositório:

```SHELL
git clone git@github.com:mairess/project-recipes-app-ts.git
```

Suba o container:

```SHELL
docker compose up -d
```

O vite server estará disponível na porta `3000`:

```HTML
http://localhost:3000
```

</details>

## Competências desenvolvidas

- Capacidade de utilizar `Context API` do React para gerenciar estado.
- Capacidade de utilizar `Hooks customizados`.
- Capacidade de utilizar `Hook useContext`.
- Capacidade de utilizar `Hook useEffect`.
- Capacidade de escrever `testes`.
- Capacidade de garantir uma boa `cobertura de testes`.
- Capacidade de `trabalhar em equipe`.
- Capacidade de `gestão do tempo`.
