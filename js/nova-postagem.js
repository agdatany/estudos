var editor = document.querySelector("#editor");

document.querySelector("#h1").addEventListener("click", function(){
    var texto = document.querySelector("#editor").innerHTML;

    var novaDiv = document.createElement('div');
    var conteudoNovo = document.createTextNode(`<h1>${texto}</h1>`);
    novaDiv.appendChild(conteudoNovo);

    document.body.insertBefore(novaDiv, editor);

    // console.log(window.getSelection().toString());
});