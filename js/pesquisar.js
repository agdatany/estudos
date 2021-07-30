document.querySelector('#pesquisar').addEventListener('input', function(){
    filtrarPesquisa(document.querySelector('#pesquisar'), document.querySelectorAll('.container'))
});

function filtrarPesquisa(barraDePesquisa, containers){

    valorDaBarra = removerAcento(barraDePesquisa.value);

    containers.forEach(element => {
        const resumo = new Object();
        resumo.titulo = removerAcento((element.querySelector('h3').innerHTML));
        resumo.data = removerAcento((element.querySelector('#data').innerHTML).replace('Data:', ''));
        resumo.professor = removerAcento((element.querySelector('#professor').innerHTML).replace('Professor:', ''));
        resumo.materia = removerAcento((element.querySelector('#materia').innerHTML).replace('Matéria:', ''));

        if(resumo.titulo.includes(valorDaBarra) || resumo.data.includes(valorDaBarra) || resumo.professor.includes(valorDaBarra) || resumo.materia.includes(valorDaBarra)){
            element.style.animation = 'dir_aparece 0.5s';
            setTimeout(function(){
                element.style.display = 'block';
            }, 300);
        }
        else{
            element.style.animation = 'esq_some 0.5s';
            setTimeout(function(){
                element.style.display = 'none';
            }, 300);
        }
    });
}

function removerAcento(texto){
    texto = texto.toLowerCase();
    texto = texto.replace(/[àáâãäå]/,"a");
    texto = texto.replace(/[èéêë]/,"e");
    texto = texto.replace(/[íìî]/,"i");
    texto = texto.replace(/[óôòõ]/,"o");
    texto = texto.replace(/[úùû]/,"u");
    texto = texto.replace(/[ç]/,"c");
    return texto; 
}