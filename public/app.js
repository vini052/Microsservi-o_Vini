document.addEventListener('DOMContentLoaded', () => {
    const listaForm = document.getElementById('listaForm');
    const listasContainer = document.getElementById('listasContainer');

    listaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const lista = {
            nome: document.getElementById('nomeLista').value
        };

        try {
            await fetch('/api/listas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(lista)
            });

            loadListas();
            listaForm.reset();
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao adicionar lista, tente novamente');
        }
    });

    async function loadListas() {
        try {
            const response = await fetch('/api/listas');
            const listas = await response.json();

            listasContainer.innerHTML = '';
            for (const lista of listas) {
                const tarefasResponse = await fetch(`/api/tarefas/lista/${lista.id}`);
                const tarefas = await tarefasResponse.json();
                const numTarefas = tarefas.length;

                const listaDiv = document.createElement('div');
                listaDiv.classList.add('card');
                listaDiv.innerHTML = `
                    <h3>${lista.nome}</h3>
                    <p>${numTarefas} tarefa(s)</p>
                    <button onclick="viewLista('${lista.id}')">Visualizar</button>
                    <button onclick="editLista('${lista.id}')">Editar</button>
                    <button onclick="deleteLista('${lista.id}')">Deletar</button>
                `;
                listasContainer.appendChild(listaDiv);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao carregar listas, tente novamente');
        }
    }

    window.viewLista = (id) => {
        window.location.href = `/lista.html?id=${id}`;
    };


    window.deleteLista = async (id) => {
        try {
            await fetch(`/api/listas/${id}`, {
                method: 'DELETE'
            });
            loadListas();
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao deletar lista, tente novamente');
        }
    };

    loadListas();
});
