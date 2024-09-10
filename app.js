document.addEventListener('DOMContentLoaded', function() {
    const pessoaForm = document.getElementById('pessoaForm');
    const pessoasList = document.getElementById('pessoasList');


    pessoaForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefone').value;

        try {
            const response = await fetch('http://localhost:3000/pessoas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, cpf, telefone }),
            });
            if (response.ok) {
                alert('Pessoa cadastrada com sucesso!');
                document.getElementById('pessoaForm').reset(); 
                carregarPessoas();
            } else {
                alert('Erro ao cadastrar a pessoa.');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    });


    async function carregarPessoas() {
        try {
            const response = await fetch('http://localhost:3000/pessoas');
            const pessoas = await response.json();
            pessoasList.innerHTML = '';
            pessoas.forEach(pessoa => {
                const li = document.createElement('li');
                li.textContent = `${pessoa.nome} - CPF: ${pessoa.cpf} - Telefone: ${pessoa.telefone}`;
                pessoasList.appendChild(li);
            });
        } catch (error) {
            console.error('Erro ao carregar pessoas:', error);
        }
    }


    carregarPessoas();
});