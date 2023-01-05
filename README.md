# Automobile Catalog

## Pré requisitos

Para rodar o projeto é necessário que você já tenha instalado em seu computador:

- [Nodejs > 14.18](https://nodejs.org/en/)
- [Python3](https://www.python.org/downloads/)

## Tecnologias

Back-end

- [Django REST framework](https://www.django-rest-framework.org/)

Front-end

- [Reactjs](https://reactjs.org/)

## Rodando o projeto

No terminal, clone o repositório e acesse o diretório com os seguintes comandos:

```
$ git clone https://github.com/adejota/automobile-catalog.git
$ cd automobile-catalog
```

### api

Para executar a api, da raiz do repo acesse o diretório da api:

```
$ cd api-automobile-catalog
```

Execute os comandos abaixo no terminal:

```
$ pip install -r requirements.txt
$ python manage.py migrate
$ python manage.py runserver
```

Pronto, o back está rodando em localhost:8000.

### web

Para executar o frontend, da raiz do repo acesse o diretório da web:

```
$ cd web-automobile-catalog
```

Execute os comandos abaixo no terminal:

```
$ npm install
$ npm run dev
```

A porta :5173 deve estar livre para evitar error de CORS.
Pronto, o front está rodando em localhost:5173.
