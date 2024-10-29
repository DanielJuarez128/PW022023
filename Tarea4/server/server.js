const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
connectDB();
/*
// Servir archivos estáticos de la app React
app.use(express.static(path.join(__dirname, 'client/build')));

// Manejar todas las rutas y redirigirlas al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
*/
app.use(cors());
app.use(bodyParser.json());
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
