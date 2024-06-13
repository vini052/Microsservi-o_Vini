class Tarefa {
    constructor(id, descricao, concluido, data, listaId) {
        this.id = id;
        this.descricao = descricao;
        this.concluido = concluido;
        this.data = data;
        this.listaId = listaId;
    }
}

module.exports = Tarefa;
