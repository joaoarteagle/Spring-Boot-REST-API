

let table = document.querySelector("#table tbody");

// ================================FUNCÃO DE SALVAR USER NO BANCO================================
function salvarUser() {
    let nome = document.querySelector("#nameInput");    //CAPTURA DADOS DO INPUT DE NOME
    let age = document.querySelector("#ageInput");      //CAPTURA DADOS DO INPUT DE IDADE
    let fone = document.querySelector("#foneInput");    //CAPTURA DADOS DO INPUT DE TELEFONE



    fetch('post', {  //DIRECIONAMENTO PARA O METODO POST
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({name: nome.value, age: age.value, fone: fone.value}) //ENVIA UM JSON NO CORPO DA REQUISIÇÃO
    })
        .then(response => {

            if (!response.ok) {
                throw new Error('Network response was not ok'); //CASO OCORRA ALGUM ERRO AO CARREGAR OS DADOS ALERTA UM ERRO
            }

            alert('Usuário salvo com sucesso!');
            location.reload();
        })
        .catch(error => {
            alert('Erro ao salvar ' + error.message);   //ENVIA UM ALERT INFORMANDO QUAL O ERRO
        });

}


function deletar(id){
    // URL da API e o ID do recurso a ser deletado
    const apiUrl = 'delete?id='+ encodeURIComponent(id);

    // Configuração da requisição
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // Se necessário, adicione cabeçalhos de autenticação ou outros cabeçalhos necessários
        }
    };

    // Faz a requisição DELETE usando fetch
    fetch(apiUrl, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível deletar o recurso');
            }
            // Se a resposta for bem-sucedida, você pode atualizar a interface do usuário ou fazer outras operações
            console.log('Recurso deletado com sucesso!');
            pesquisarUser();
        })
        .catch(error => {
            console.error('Erro ao deletar recurso:', error);
        });

}


function pesquisarUser(){
    table.innerHTML = '';
    let nome = document.querySelector("#user_name");
    if(nome != null && !(nome.value === "")){
        console.log("antes do fetch");

        fetch('getByName?name=' + encodeURIComponent(nome.value), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(response => {
            console.log("entrou");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        }).then(data=>{

            // Aqui você manipula os dados recebidos do servidor
            data.forEach(usuario => {
                let tr = document.createElement('tr');

                //CELULA DE NOME DE USUARIO
                let tdName = document.createElement('td');
                tdName.textContent = usuario.name;
                tr.appendChild(tdName);

                //CELULA DE TELEFONE
                let tdFone = document.createElement('td');
                tdFone.textContent = usuario.fone;
                tr.appendChild(tdFone);

                //CELULA DE FUNÇÕES(AINDA SERÃO INPLEMENTADAS)
                let func = document.createElement('td');
                let editar = document.createElement('button');
                editar.setAttribute("class", "btn btn-primary");
                editar.setAttribute("style", "margin-right:5px;");
                editar.textContent = "Editar";

                const linkElement = document.createElement("a");
                linkElement.setAttribute("href", "#");
                linkElement.setAttribute("onclick", `deletar(${usuario.id})`);
                const lixeira = document.createElement("img");
                lixeira.setAttribute("src", "../static/img/lixeira.png");
                lixeira.setAttribute("alt", "teste");
                linkElement.appendChild(lixeira);


                func.appendChild(editar);
                func.appendChild(linkElement);

                //ADICIONANDO AS FUNÇÕES A CELULA
                tr.appendChild(func);

                //ADICIONANDO LINHA COM TODAS AS CELULAS NA TABELA
                table.appendChild(tr);
            })

        }).catch(error => {
            alert('Erro ao salvar ' + error.message);
        });
    }


}


