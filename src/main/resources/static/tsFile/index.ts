import * as $ from 'jquery';


function salvarUser():void {
    let nome = document.getElementById("#nameInput") as HTMLInputElement;
    let age = document.getElementById("#ageInput") as HTMLInputElement;
    let fone = document.getElementById("#foneInput") as HTMLInputElement;
   
   

    fetch('springBootJdevApi/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({name: nome.value, age: age.value, fone: fone.value})
    })
    .then(response => {
        console.log("entrou");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert('Gravou com sucesso!');
        location.reload();
    })
    .catch(error => {
        alert('Erro ao salvar ' + error.message);
    });
    
    // $.ajax({
    //     method: "POST",
    //     url: "post",
    //     data: JSON.stringify({name: nome.value, age: age.value, fone: fone.value}),
    //     contentType: "application/json; charset=utf-8",
    //     success: function (response) {
    //         alert("Gravou com sucesso!");
    //         location.reload();
    //     }
    // }).fail(function (xhr, status, errorThrow) {
    //     alert("Erro ao salvar " + xhr.responseText);
    // });

}
// function buscar(){
//     let nome = $("#user_name").val();
//      if(nome != null && nome.trim()!= ""){
//          $.ajax({
//              method:"GET",
//              url: "getByName",
//              data: "name = " + nome,
//              contentType: "application/json; charset=utf-8",
//              success: function(response){
//                  alert("Get com sucesso!");
//                  location.reload();
//              }
//          }).fail(function (xhr, status, errorThrow){
//              alert("Erro ao Buscar " + xhr.responseText);
//          });
//      }
// }
