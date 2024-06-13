const express = require('express');
const { addLista, getAllListas, getLista, updateLista, deleteLista } = require('../controllers/listaController');

const router = express.Router();

router.post('/listas', addLista);
router.get('/listas', getAllListas);
router.get('/listas/:id', getLista);
router.put('/listas/:id', updateLista);
router.delete('/listas/:id', deleteLista);

module.exports = router;
