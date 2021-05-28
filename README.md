## Formation Node.js 26-28 mai 2021

Contact : nicolas@chambrier.fr

### Ressources

- Les diagrammes ("tableau blanc") (lien inclus en fin de formation)
- Les slides dans le dossier "slides"
- Les quelques exemples isolés dans le dossier "samples"
- Le gros TP dans le dossier "app"


### Le TP

Chat :

- [x] Authentification
- [x] Envoi/réception de message
- [x] Rooms (fait dans "app")
- [ ] Authentification avec mot de passe
- [ ] Chat-bot "fibo"
- [ ] Chat-bot "meteo"

Pré-requis :

- Node
- Serveur Redis
  * Pour Windows [voir ServiceStack/redis-windows](https://github.com/ServiceStack/redis-windows)
  * Avec Docker : `docker run --name redis-formation -p 6379:6379 redis -d` puis `docker [start|stop|rm] redis-formation`
    * Client : `docker exec -it redis-formation redis-cli`

#### Démarrage

* Installation des dépendances : `npm install`
* Démarrage du serveur :
  * `npm start`
  * Mode cluster : `npm run start-cluster` (dans "app")
  * Mode watch : `npm run dev:server`
* Tests unitaires :
  * `npm test`
  * Mode watch : `npm run dev:test`
