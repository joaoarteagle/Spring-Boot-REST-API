

let table = document.querySelector("#table tbody");

// ================================FUNCÃO DE SALVAR USER NO BANCO================================
function salvarUser() {
    let nome = document.querySelector("#nameInput");    //CAPTURA DADOS DO INPUT DE NOME
    let age = document.querySelector("#ageInput");      //CAPTURA DADOS DO INPUT DE IDADE
    let fone = document.querySelector("#foneInput");    //CAPTURA DADOS DO INPUT DE TELEFONE

   const valida = validarTelefone(fone.value);

   if(valida){

       fetch('/springBootJdevApi/user/post', {  //DIRECIONAMENTO PARA O METODO POST
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


}


function deletar(id){
    // URL da API e o ID do recurso a ser deletado
    const apiUrl = 'user/delete?id='+ encodeURIComponent(id);

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
            alert('Recurso deletado com sucesso!');
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
       
        fetch('/springBootJdevApi/user/getByName?name=' + encodeURIComponent(nome.value), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(response => {
          
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
                        
                        
                         // let editar = document.createElement('a');
                        // editar.setAttribute("href", "#");
                        // editar.setAttribute("onclick", `update(${usuario.id})`);

                        // let pen = document.createElement("img");
                        // pen.setAttribute("src", "static/img/update.png");
                        // pen.setAttribute("style", "width: 20px; margin-right: 5px;");
                        // editar.appendChild(pen);

              //  editar.setAttribute("onclick", )

                const linkElement = document.createElement("a");
                linkElement.setAttribute("href", "#");
                linkElement.setAttribute("onclick", `deletar(${usuario.id})`);
                const lixeira = document.createElement("img");
                lixeira.setAttribute("src", "../springBootJdevApi/static/img/lixeira.png");
                lixeira.setAttribute("style", "width: 20px;")
                lixeira.setAttribute("alt", "lixeira");
                linkElement.appendChild(lixeira);


               // func.appendChild(editar);
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


// function update(id){

//     fetch('/springBootJdevApi/user/getByID?iduser=' + id, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json; charset=utf-8'
//         }
//     }).then(response => {
//         //console.log(response.json());
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
        


//         let nome = document.querySelector("#nameInput");    //CAPTURA DADOS DO INPUT DE NOME
//         let age = document.querySelector("#ageInput");      //CAPTURA DADOS DO INPUT DE IDADE
//         let fone = document.querySelector("#foneInput");    //CAPTURA DADOS DO INPUT DE TELEFONE

//         //console.log(stringify(resposta.nome));
//         // nome.value = JSON.parse(resposta.name);
//         // age.value = JSON.parse(resposta.age);
//         // fone.value = JSON.parse(resposta.fone);

//        // return response.json();
//     })

   

// }


function validarTelefone(telefone) {
    // Remove todos os caracteres não numéricos do número de telefone
    const numeroLimpo = telefone.replace(/\D/g, '');
    
    // Verifica se o número possui 11 ou 10 dígitos (considerando o DDD)
    if (numeroLimpo.length !== 11 && numeroLimpo.length !== 10) {
        alert("Telefone Invalido");
        return false;
    }
    
    // Lista de códigos de área válidos no Brasil
    const codigosDeAreaValidos = [
        '11', '12', '13', '14', '15', '16', '17', '18', '19', // São Paulo
        '21', '22', '24', // Rio de Janeiro
        '27', '28', // Espírito Santo
        '31', '32', '33', '34', '35', '37', '38', // Minas Gerais
        '41', '42', '43', '44', '45', '46', // Paraná
        '47', '48', '49', // Santa Catarina
        '51', '53', '54', '55', // Rio Grande do Sul
        '61', // Distrito Federal e Goiás
        '62', '64', // Goiás
        '63', // Tocantins
        '65', '66', // Mato Grosso
        '67', // Mato Grosso do Sul
        '68', // Acre
        '69', // Rondônia
        '71', '73', '74', '75', '77', // Bahia
        '79', // Sergipe
        '81', '82', '83', '84', '85', '86', '87', '88', '89', // Pernambuco
        '91', '93', '94', // Pará
        '95', // Roraima
        '96', // Amapá
        '97', '98', '99' // Amazonas
    ];
    
    // Obtém o código de área do número
    const codigoDeArea = numeroLimpo.slice(0, 2);
    
    // Verifica se o código de área está na lista de códigos válidos
    if (!codigosDeAreaValidos.includes(codigoDeArea)) {
        alert("DDD invalido")
        return false;
    }
    
    // Se passou por todas as verificações, retorna verdadeiro
    return true;
}
