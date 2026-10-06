## Como executar
Com o MySQL/MariaDB ligado (usuario root, senha vazia — ajuste em `config/db.js` se necessario):

    npm start

## Rotas (Postman)
| Metodo | Rota | Body JSON |
|---|---|---|
| GET | /jogo | - |
| GET | /jogo/:id | - |
| POST | /jogo | {"titulo":"...","plataforma":"...","genero":"..."} |
| PUT | /jogo/:id | {"titulo":"...","plataforma":"...","genero":"..."} |
| DELETE | /jogo/:id | - |