# Candidatrace

Application web composee de trois services Docker:

- `mysql` : base MySQL 8.0 avec schema et donnees de demo initialises depuis `db/init.sql` et `db/seeders.sql`
- `server` : API Spring Boot exposee sur `http://localhost:8080/api`
- `client` : interface Angular servie par Nginx sur `http://localhost:4200`

Les trois conteneurs partagent le reseau Docker `candidatrace-network`. La base de donnees conserve ses donnees dans le volume `mysql_data`.
Les variables Docker sont chargees depuis le fichier `.env`, genere a partir de `.env.example`.

## Lancer le projet

Depuis la racine du projet:

```bash
docker-compose up --build
```

Cette commande construit les images si besoin, demarre MySQL, puis l'API et le client.

## Arreter le projet

```bash
docker-compose down
```

Pour supprimer aussi les donnees de la base:

```bash
docker-compose down -v
```

## Acces rapide

- Client Angular: `http://localhost:4200`
- API Spring Boot: `http://localhost:8080/api`
- MySQL: `localhost:3306`

## Notes

- Le client appelle l'API via `http://localhost:8080`