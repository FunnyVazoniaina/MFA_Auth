# Étape 1 : image Node.js avec pnpm activé
FROM node:lts

# Active pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Dossier de travail
WORKDIR /app

# Copier seulement les fichiers de dépendances
COPY package.json pnpm-lock.yaml ./

# Installer les dépendances
RUN pnpm install

# Copier le reste des fichiers
COPY . .

# Exposer le port utilisé par Vite
EXPOSE 3000

# Démarrer le serveur de développement
CMD ["pnpm", "run", "dev", "--", "--host"]
