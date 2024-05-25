# Readme

# [Readme.md]

Pour faire fonctionner ce projet Horizons Lointains, vous devez:

## Pour le back :

Aller dans le dossier server avec la commande:

```
cd server
```

Puis installer les modules nécessaires avec la commande:

```
npm i
```

```
npm start
```

### Modules installés:

- nodemon
- mongoose
- express
- cors
- jsonwebtoken
- multer
- bcrypt

### Configuration:

Modifier ou ajouter le fichier .env avec les variables suivantes

- BASE_URL = le chemin vers votre environnement (localhost)
- MONGO_URI = le lien vers votre base de données
- PORT = Configurez votre port, par défaut il est sur le 9000
- JWT_SECRET = définissez un secret pour le JSONWEBTOKEN
- JWT_EXPIRATION = Choisissez la date d'expiration de votre token donc de votre connexion

## API v1

Chemin d'accès : /api/

### Destinations:

- GET => /destinations/ | Permet de récupérer tous les destination
- GET => /destinations/:id | Permet de récupérer un destination
- POST => /destinations/new | OBLIGATOIREMENT ADMIN | Permet de créer un destination
- PUT => /destinations/edit/:id | OBLIGATOIREMENT ADMIN | Permet de mettre à jour un destination
- DELETE => /destinations/delete/:id | OBLIGATOIREMENT ADMIN | Permet de supprimer une destination