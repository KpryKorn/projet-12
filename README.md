# SportSee

SportSee est un tableau de bord d'analyse sportive. Ce dossier parent est divisé en deux parties : le frontend et le backend.

## Frontend

### Stack utilisée

- React
- TypeScript
- Vite
- ESLint

### Lancer le serveur frontend

1. Cloner le dépôt.
2. Naviguer dans le répertoire front

```
cd sportsee-frontend
```

3. Installer les dépendances

```
npm i
```

4. Lancer le serveur de développement

```
npm run dev
```

## Backend

### Stack utilisée

- Node.js
- Express
- Docker (optionnel)

### Lancer le serveur backend

1. Cloner le dépôt.
2. Naviguer dans le répertoire back

```
cd sportsee-backend
```

3. Installer les dépendances

```
npm i
```

4. Lancer le serveur de développement

```
npm run start
```

## Endpoints

### Endpoints disponibles (userID 12 et 18 uniquement)

- `http://localhost:3000/user/${userId}` - Récupère les informations d'un utilisateur.
- `http://localhost:3000/user/${userId}/activity` - Récupère l'activité quotidienne d'un utilisateur.
- `http://localhost:3000/user/${userId}/average-sessions` - Récupère les sessions moyennes d'un utilisateur par jour.
- `http://localhost:3000/user/${userId}/performance` - Récupère la performance d'un utilisateur.
