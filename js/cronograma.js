// Adicionando as cores no campo "cor de fundo do evento"
cores = document.querySelectorAll('.cor');

cores.forEach(cor => {
    cor.style.backgroundColor = '#'+cor.id;
});

$(document).ready(function(){
    // Selecionando a cor do evento
    $('.cor').click(function(e){
        if($(e.target).hasClass('selecionado')){
            $(e.target).addClass('selecionado');
        }
        else{
            $('.cor').removeClass('selecionado');
            $(e.target).toggleClass('selecionado');
        }
    });

    // Botão limpar
    $('#limpar').click(function(){
        $('.selecionado').removeClass('selecionado');
        $('.cor').eq(0).addClass('selecionado');
    });

    $('#resetarCronograma').click(function(){
        fechaModal();
        abreModal('modal-resetar');
    });

    $('.cancelarModal').click(function(){
        fechaModal();
    });

    $('.btnAdicionarEvento').click(function(){
        abreModal('modal-editar');
    });

    if($(window).width() < 1366){
        removeDiaSemana(1);
    }

    $(window).resize(function(){
        if($(window).width() < 1366){
            dia = $('#selecionaDia').val();
            dias = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
            index = dias.indexOf(dia) + 1;
            if(index == 0){
                index = 1;
            }
            removeDiaSemana(index);
        }
        else{
            apareceDiaSemana();
        }
    });

    $('#selecionaDia').change(function(){
        switch($(this).val()){
            case 'domingo':
                removeDiaSemana(1);
                break;
            
            case 'segunda':
                removeDiaSemana(2);
                break;
            
            case 'terca':
                removeDiaSemana(3);
                break;
            
            case 'quarta':
                removeDiaSemana(4);
                break;
            
            case 'quinta':
                removeDiaSemana(5);
                break;
            
            case 'sexta':
                removeDiaSemana(6);
                break;
            
            case 'sabado':
                removeDiaSemana(7);
                break;
        }
    });
});

// Função para ativar a responsividade da tabela
function removeDiaSemana(diaSemana){
    for (let i = 1; i < 8; i++) {
        if(i != diaSemana){
            $('tr').find(`th:eq(${i})`).addClass('none');
            $('tr').find(`td:eq(${i})`).addClass('none');
        }
        else{
            $('tr').find(`th:eq(${i})`).removeClass('none');
            $('tr').find(`td:eq(${i})`).removeClass('none');
        }
    }
}

function apareceDiaSemana(){
    for (let i = 1; i < 8; i++) {
        $('tr').find(`th:eq(${i})`).removeClass('none');
        $('tr').find(`td:eq(${i})`).removeClass('none');
    }
}

// Remove o evento
function removerEvento(){
    var horarioValor = ($('input#horario').val()).substring(0, 5);
    var horarioTr = $(`td:contains('${horarioValor}')`).closest('tr');
    
    for(let i = 0; i < 7; i++) {
        if($(`input[type='checkbox']`).eq(i).is(':checked')){
            var tdEvento = horarioTr.find('td').eq(i + 1);
            tdEvento.html('-');
        }
    }

    if(horarioTr.children('td').children('div').length == 0){
        if(horarioValor == "23:59"){
            $(`td:contains('${horarioValor}')`).closest('tr').addClass('none');
        }
        else{
            horarioTr.remove();
        }
    }
}

// Verifica qual a situação do evento e adiciona uma TR caso necessário
function checkTr(){
    var horariosTd = $('.td-horario');
    var novoHorario = parseInt(($('input#horario').val().replace(':', '')));

    if($('#nenhum-evento')){
        $('#nenhum-evento').closest('tr').remove();
    }

    var horarios = [];

    for(let cont = 0; cont < horariosTd.length; cont++) {
        horarios.push(parseInt(($(horariosTd[cont]).text()).replace(':', '')));
    }

    horarios.some(horario => {
        if(novoHorario == horario){
            editarTr(horario);
            return true;
        }
        else if(novoHorario < horario){
            adicionarTr(novoHorario, horario);
            return true;
        }
    });
}

// Edita a Tr
function editarTr(horario){
    horario = transformaStringHorario(horario);
    var tr = $(`td:contains('${horario}')`).closest('tr');

    if(horario == "23:59"){
        $(`td:contains('${horario}')`).closest('tr').removeClass('none');
    }

    for(let i = 0; i < 7; i++) {
        if($(`input[type='checkbox']`).eq(i).is(':checked')){
            tr.find('td').eq(i + 1).html('');
            tr.find('td').eq(i + 1).append(`<div class="evento" style="background-color: #${$('.selecionado').attr("id")}">${$('#evento').val()}</div>`);
        }
    }
}

// Adiciona a Tr com o evento
function adicionarTr(novoHorario, horario){
    horario = transformaStringHorario(horario);
    novoHorario = transformaStringHorario(novoHorario);

    var novaTr = $(`td:contains('${horario}')`).closest('tr').prev().after(`<tr><td class='td-horario'>${novoHorario}</td></tr>`);

    for(let i = 0; i < 7; i++) {
        if($(`input[type='checkbox']`).eq(i).is(':checked')){
            novaTr.next('tr').append(`<td><div class="evento" style="background-color: #${$('.selecionado').attr("id")}">${$('#evento').val()}</div></td>`);
        }
        else{
            novaTr.next('tr').append('<td>-</td>');
        }
    }
}

// Transforma números inteiros em string para ser mostrado ou pesquisado na tabela ex: 0003 -> 00:03
function transformaStringHorario(horario){
    horarioString = horario.toString();
    if(horarioString.length == 3){
        horarioString = "0" + horarioString;
    }
    else if(horarioString.length == 2){
        horarioString = "00" + horarioString;
    }
    else if(horarioString.length == 1){
        horarioString = "000" + horarioString;
    }
    horarioString = horarioString.substring(0,2) + ':' + horarioString.substring(2,5);
    return horarioString;
}

function abreModal(classeModal){
    $(`.${classeModal}`).removeClass('none');

    $(`.fundo-modal`).removeClass('none');

    $('body').css('overflow', 'hidden');
}

function fechaModal(){
    $(`.modal`).addClass('none');

    $(`.fundo-modal`).addClass('none');

    $('body').css('overflow', 'auto');

    $('.retorno').css('display', 'none');
}