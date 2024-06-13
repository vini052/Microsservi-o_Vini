const express = require('express');
const { addTarefa, getAllTarefas, getTarefasByLista, getTarefa, updateTarefa, deleteTarefa } = require('../controllers/tarefaController');

const router = express.Router();

router.post('/tarefas', addTarefa);
router.get('/tarefas', getAllTarefas);
router.get('/tarefas/lista/:listaId', getTarefasByLista);
router.get('/tarefas/:id', getTarefa);
router.put('/tarefas/:id', updateTarefa);
router.delete('/tarefas/:id', deleteTarefa);

module.exports = router;
