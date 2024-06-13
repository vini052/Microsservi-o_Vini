document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const listaId = urlParams.get('id');
    const listaNome = document.getElementById('listaNome');
    const tarefaForm = document.getElementById('tarefaForm');
    const tarefaListPendentes = document.getElementById('tarefaListPendentes');
    const tarefaListConcluidas = document.getElementById('tarefaListConcluidas');

    async function getListaNome() {
        const response = await fetch(`/api/listas/${listaId}`);
        const lista = await response.json();
        listaNome.textContent = `Lista: ${lista.nome}`;
    }

    tarefaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const tarefa = {
            descricao: document.getElementById('descricao').value,
            data: document.getElementById('data').value,
            concluido: false,
            listaId
        };

        await fetch('/api/tarefas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tarefa)
        });

        loadTarefas();
        tarefaForm.reset();
    });

    async function loadTarefas() {
        const response = await fetch(`/api/tarefas/lista/${listaId}`);
        const tarefas = await response.json();

        tarefaListPendentes.innerHTML = '<h2>Tarefas Pendentes</h2>';
        tarefaListConcluidas.innerHTML = '<h2>Tarefas Concluídas</h2>';

        tarefas.forEach(tarefa => {
            const tarefaDiv = document.createElement('div');
            tarefaDiv.classList.add('tarefa');
            tarefaDiv.innerHTML = `
                <h4>${tarefa.descricao}</h4>
                <p>Data: ${tarefa.data}</p>
                <label>
                    <input type="checkbox" ${tarefa.concluido ? 'checked' : ''} onchange="toggleConcluido('${tarefa.id}', this.checked)">
                    Concluído
                </label>
                <button onclick="deleteTarefa('${tarefa.id}', '${listaId}')">Deletar</button>
            `;

            if (tarefa.concluido) {
                tarefaListConcluidas.appendChild(tarefaDiv);
            } else {
                tarefaListPendentes.appendChild(tarefaDiv);
            }
        });
    }

    window.deleteTarefa = async (id, listaId) => {
        await fetch(`/api/tarefas/${id}`, {
            method: 'DELETE'
        });
        loadTarefas();
    };

    window.toggleConcluido = async (id, concluido) => {
        await fetch(`/api/tarefas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ concluido })
        });
        loadTarefas();
    };

    getListaNome();
    loadTarefas();
});
