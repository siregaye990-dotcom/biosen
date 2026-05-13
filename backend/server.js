const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes de base
app.get('/', (req, res) => {
  res.send('Serveur Bio Sén opérationnel !');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Le serveur répond bien.' });
});

// Connexion MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/biosen';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB avec succès'))
  .catch(err => console.error('Erreur de connexion MongoDB:', err));

// Port d'écoute (Important pour Render)
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
