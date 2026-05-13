# Bio Sén — Backend

Ce dossier contient la configuration du backend pour Bio Sén, basée sur Supabase.

## Contenu
- `supabase_setup.sql` : script SQL pour créer les tables `orders`, `stock`, `visits` et les politiques de sécurité.

## Configuration Supabase
1. Créez un projet sur https://supabase.com
2. Copiez l'URL du projet et la clé publique anon
3. Ajoutez ces variables dans `frontend/.env` (ou dans votre application front) :

```bash
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Installation des tables
- Ouvrez l'éditeur SQL Supabase
- Copiez-collez `supabase_setup.sql`
- Exécutez le script

## Authentification
- Dans Supabase → Authentication → Users, créez un compte admin
- Ce compte sera utilisé pour accéder au dashboard admin du frontend

## Remarque
La logique métier du frontend utilise Supabase pour lire/écrire les commandes, le stock et les visites.
Si vous souhaitez ajouter un backend Node/Express plus tard, c'est ici que vous pouvez le construire.
