'use strict';

const db = require('../db');
const { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');
const Lista = require('../models/lista');

const addLista = async (req, res, next) => {
    try {
        const data = req.body;
        await addDoc(collection(db, 'listas'), data);
        res.send('Lista adicionada com sucesso');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllListas = async (req, res, next) => {
    try {
        const listasCollection = collection(db, 'listas');
        const listasSnapshot = await getDocs(listasCollection);
        const listasArray = [];

        if (listasSnapshot.empty) {
            res.status(404).send('Nenhuma lista encontrada');
        } else {
            listasSnapshot.forEach(doc => {
                const lista = new Lista(doc.id, doc.data().nome);
                listasArray.push(lista);
            });
            res.send(listasArray);
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getLista = async (req, res, next) => {
    try {
        const id = req.params.id;
        const listaDoc = doc(db, 'listas', id);
        const listaData = await getDoc(listaDoc);

        if (!listaData.exists()) {
            res.status(404).send('Lista com o ID fornecido não encontrada');
        } else {
            const lista = new Lista(listaData.id, listaData.data().nome);
            res.send(lista);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateLista = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const listaDoc = doc(db, 'listas', id);
        await updateDoc(listaDoc, data);
        res.send('Lista atualizada com sucesso');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteLista = async (req, res, next) => {
    try {
        const id = req.params.id;
        const listaDoc = doc(db, 'listas', id);
        await deleteDoc(listaDoc);
        res.send('Lista deletada com sucesso');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addLista,
    getAllListas,
    getLista,
    updateLista,
    deleteLista,
}
