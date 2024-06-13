const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const listaRoutes = require('./routes/lista-routes');
const tarefaRoutes = require('./routes/tarefa-routes');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', listaRoutes);
app.use('/api', tarefaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
