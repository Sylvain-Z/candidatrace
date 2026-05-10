# MySQL Workbench & CandidaTrace Docker

## 📝 Configuration de MySQL Workbench

Ce guide vous montre comment se connecter à la base de données CandidaTrace via MySQL Workbench.

## 🔧 Configuration de la connexion

### Prérequis
- MySQL Workbench installé
- Containers Docker en cours d'exécution (`docker-compose up`)

### Étapes

#### 1. Ouvrir MySQL Workbench
Lancez MySQL Workbench

#### 2. Créer une nouvelle connexion

1. Cliquez sur le **+** à côté de "MySQL Connections"
2. Cliquez sur "New Connection"

#### 3. Remplir les paramètres de connexion

**Onglet Connection**:

| Paramètre | Valeur |
|-----------|--------|
| Connection Name | `CandidaTrace Docker` |
| Connection Method | TCP/IP |
| Hostname | `localhost` |
| Port | `3306` |
| Username | `candidatrace_user` |
| Password | `candidatrace_password` |
| Default Schema | `candidatrace_db` |

**Configuration détaillée**:

```
Connection Name: CandidaTrace Docker
Hostname: localhost
Port: 3306
Username: candidatrace_user
Password: candidatrace_password
Default Database: candidatrace_db
```

#### 4. Tester la connexion

1. Cliquez sur "Test Connection"
2. Vous devriez voir un message "Connection successful"

#### 5. Enregistrer la connexion

1. Cliquez sur "OK"
2. La connexion apparaît maintenant dans vos MySQL Connections

## 🚀 Utilisation

### Ouvrir la connexion

Cliquez sur "CandidaTrace Docker" dans l'écran principal de MySQL Workbench.

### Voir les tables

1. Dans le Navigator (à gauche), expandez "candidatrace_db"
2. Vous verrez les tables:
   - `users`
   - `applications`

### Requêtes utiles

#### Voir tous les utilisateurs
```sql
SELECT * FROM users;
```

#### Voir tous les utilisateurs avec le nombre d'applications
```sql
SELECT 
    u.id, 
    u.firstname, 
    u.lastname, 
    u.email,
    COUNT(a.id) as applications_count
FROM users u
LEFT JOIN applications a ON u.id = a.user_id
GROUP BY u.id, u.firstname, u.lastname, u.email;
```

#### Voir toutes les applications
```sql
SELECT * FROM applications;
```

#### Voir les applications d'un utilisateur spécifique
```sql
SELECT 
    a.*,
    u.firstname,
    u.lastname,
    u.email
FROM applications a
JOIN users u ON a.user_id = u.id
WHERE u.email = 'jean.dupont@example.com';
```

#### Voir les applications acceptées
```sql
SELECT 
    a.id,
    a.company_name,
    a.application_date,
    a.final_response_date,
    u.firstname,
    u.lastname
FROM applications a
JOIN users u ON a.user_id = u.id
WHERE a.final_response = 1;
```

#### Voir les applications rejetées
```sql
SELECT 
    a.id,
    a.company_name,
    a.application_date,
    a.final_response_date,
    u.firstname,
    u.lastname
FROM applications a
JOIN users u ON a.user_id = u.id
WHERE a.final_response = 0;
```

#### Voir les applications en attente
```sql
SELECT 
    a.id,
    a.company_name,
    a.application_date,
    u.firstname,
    u.lastname
FROM applications a
JOIN users u ON a.user_id = u.id
WHERE a.final_response IS NULL;
```

## 📊 Export de données

### Exporter une table

1. Cliquez droit sur la table
2. Sélectionnez "Send to Export Set"
3. Choisissez votre format (SQL, CSV, etc.)

### Exporter une requête

1. Écrivez votre requête dans l'onglet "Query"
2. Cliquez droit sur les résultats
3. Sélectionnez "Export result set" ou "Copy to Clipboard"

## 🔍 Visualiser les relations

### Diagrame ER (Entity Relationship)

1. Allez à "Database" > "Reverse Engineer"
2. Sélectionnez la connexion "CandidaTrace Docker"
3. Suivez les étapes
4. Vous obtiendrez un diagramme des relations entre tables

## 🛡️ Sauvegardes

### Exporter la base de données

1. Allez à "Server" > "Data Export"
2. Sélectionnez "candidatrace_db"
3. Choisissez l'emplacement de sauvegarde
4. Cliquez sur "Export"

### Importer une sauvegarde

1. Allez à "Server" > "Data Import"
2. Sélectionnez "Import from Self-Contained File"
3. Choisissez votre fichier SQL
4. Cliquez sur "Start Import"

## ⚙️ Outils utiles

### Workbench Query

Utilisez l'onglet "Query" pour:
- Écrire et exécuter des requêtes SQL
- Voir les résultats en temps réel
- Modifier les données directement

### Administration

Allez à "Server" pour:
- Voir l'état du serveur
- Gérer les utilisateurs
- Configurer les options

## 🔐 Sécurité

### Modifier le mot de passe

```sql
ALTER USER 'candidatrace_user'@'%' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
```

### Voir les utilisateurs existants

```sql
SELECT user, host FROM mysql.user;
```

## 📋 Modèle de données

### Relation One-to-Many

```
users (1)
    ↓
    ├─ N applications
```

### Types de données utilisés

- `VARCHAR(42)` - Texte court (noms, ville, téléphone)
- `VARCHAR(255)` - Texte moyen (email, mot de passe)
- `MEDIUMTEXT` - Texte long (notes, URLs)
- `TIMESTAMP` - Date et heure
- `TINYINT` - Booléen (0/1)
- `INT` - Nombre entier

## 🚨 Problèmes courants

### "Unknown server host"

Assurez-vous que:
- Les containers Docker sont en cours d'exécution
- Le port 3306 n'est pas bloqué par un pare-feu
- Le hostname est "localhost" (pas 127.0.0.1)

### "Access denied for user"

Vérifiez:
- Le nom d'utilisateur: `candidatrace_user`
- Le mot de passe: `candidatrace_password`
- Que vous accédez au bon host

### Connexion perdue

Si vous perdez la connexion:
1. Vérifiez que Docker est toujours en cours d'exécution
2. Essayez de reconnecter via Workbench
3. Redémarrez les containers si nécessaire

## 💡 Conseils

- Créez des favoris pour les requêtes utilisées fréquemment
- Utilisez l'historique des requêtes (History tab)
- Activez les sauvegardes automatiques
- Documentez vos modifications

## 🔗 Ressources

- [MySQL Workbench Documentation](https://dev.mysql.com/doc/workbench/en/)
- [SQL Tutorial](https://www.w3schools.com/sql/)
- [MySQL Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/)
