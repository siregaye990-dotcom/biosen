# 1. Utiliser une image Node.js officielle comme base
FROM node:20-slim

# 2. Définir le dossier de travail dans le conteneur
WORKDIR /app

# 3. Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# 4. Installer les dépendances
RUN npm install --production

# 5. Copier le reste des fichiers du projet
COPY . .

# 6. Exposer le port que Render utilise par défaut
EXPOSE 10000

# 7. Commande pour démarrer le serveur
CMD ["node", "server.js"]
