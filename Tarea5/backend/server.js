const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const pokemonRoutes = require('./routes/pokemon.routes');
const app = express();

const mongoUri = process.env.MONGO_URI || 'mongodb://admin:admin@localhost:27017/pokemonDB';
mongoose.connect(mongoUri)
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

app.use(cors());
app.use(express.json());
app.use('/api/pokemon', pokemonRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
