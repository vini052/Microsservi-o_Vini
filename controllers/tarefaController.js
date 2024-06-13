'use strict';

const db = require('../db');
const { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');
const Tarefa = require('../models/tarefa');

const addTarefa = async (req, res, next) => {
    try {
        const data = req.body;
        await addDoc(collection(db, 'tarefas'), data);
        res.send('Tarefa adicionada com sucesso');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllTarefas = async (req, res, next) => {
    try {
        const tarefasCollection = collection(db, 'tarefas');
        const tarefasSnapshot = await getDocs(tarefasCollection);
        const tarefasArray = [];

        if (tarefasSnapshot.empty) {
            res.status(404).send('Nenhuma tarefa encontrada');
        } else {
            tarefasSnapshot.forEach(doc => {
                const tarefa = new Tarefa(
                    doc.id,
                    doc.data().descricao,
                    doc.data().concluido,
                    doc.data().data,
                    doc.data().listaId
                );
                tarefasArray.push(tarefa);
            });
            res.send(tarefasArray);
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTarefasByLista = async (req, res, next) => {
    try {
        const listaId = req.params.listaId;
        const tarefasCollection = collection(db, 'tarefas');
        const tarefasSnapshot = await getDocs(tarefasCollection);
        const tarefasArray = [];

        tarefasSnapshot.forEach(doc => {
            if (doc.data().listaId === listaId) {
                const tarefa = new Tarefa(
                    doc.id,
                    doc.data().descricao,
                    doc.data().concluido,
                    doc.data().data,
                    doc.data().listaId
                );
                tarefasArray.push(tarefa);
            }
        });

        res.send(tarefasArray);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTarefa = async (req, res, next) => {
    try {
        const id = req.params.id;
        const tarefaDoc = doc(db, 'tarefas', id);
        const tarefaData = await getDoc(tarefaDoc);

        if (!tarefaData.exists()) {
            res.status(404).send('Tarefa com o ID fornecido não encontrada');
        } else {
            const tarefa = new Tarefa(
                tarefaData.id,
                tarefaData.data().descricao,
                tarefaData.data().concluido,
                tarefaData.data().data,
                tarefaData.data().listaId
            );
            res.send(tarefa);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateTarefa = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const tarefaDoc = doc(db, 'tarefas', id);
        await updateDoc(tarefaDoc, data);
        res.send('Tarefa atualizada com sucesso');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteTarefa = async (req, res, next) => {
    try {
        const id = req.params.id;
        const tarefaDoc = doc(db, 'tarefas', id);
        await deleteDoc(tarefaDoc);
        res.send('Tarefa deletada com sucesso');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addTarefa,
    getAllTarefas,
    getTarefasByLista,
    getTarefa,
    updateTarefa,
    deleteTarefa,
}
