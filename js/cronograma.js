$(document).ready(function(){
    cores = document.querySelectorAll('.cor');

    cores.forEach(cor => {
        cor.style.backgroundColor = '#'+cor.id;
    });

    $('.cor').click(function(e){
        if($(e.target).hasClass('selecionado')){
            $(e.target).removeClass('selecionado');
        }
        else{
            $('.cor').removeClass('selecionado');
            $(e.target).addClass('selecionado');
        }
    });

    $('.evento').click(function(e){
        var evento = ($(this).text());

        var horario = ($(this).closest("tr")).find('td:eq(0)').text();

        var dia_semana = $(this).closest('table').find('th').eq($(this).parent().index()).text();
    });

    $('#adicionar').click(function(){
        var dados = $('#formEditar').serialize() + '&cor=' + $('.selecionado').attr('id');

        
        $.ajax({
            method: 'POST',
            url: './php/cronograma_add.php',
            data: dados,
        })
        
        .done(function(msg){
            $(".retorno").css("display", "block");
            if(msg == true){
                $(".retorno").html("Evento adicionado com sucesso!");
                checkTr();z
            }
            else{
                $(".retorno").html(msg);
            }
        })
        
        .fail(function(){
            $(".retorno").css("display", "block");
            $(".retorno").html("Erro de dados, tente novamente.");
        });

        return false;
    });

    $('#alterar').click(function(){
        var dados = $('#formCad').serialize();

        $.ajax({
            method: 'POST',
            url: 'php/cronograma_alterar.php',
            data: dados,
        })

        .done(function(msg){
            $(".retorno").css("display", "block");
            $(".retorno").html("Evento adicionado com sucesso!");
        })
        
        .fail(function(){
            $(".retorno").css("display", "block");
            $(".retorno").html("Erro de dados, tente novamente.");
        });
    });

    $('#remover').click(function(){
        var dados = $('#formCad').serialize();

        $.ajax({
            method: 'POST',
            url: 'php/cronograma_excluir.php',
            data: dados,
        })

        .done(function(msg){
            $(".retorno").css("display", "block");
            $(".retorno").html("Evento adicionado com sucesso!");
        })
        
        .fail(function(){
            $(".retorno").css("display", "block");
            $(".retorno").html("Erro de dados, tente novamente.");
        });
    });

    $('#limpar').click(function(){
        $('.selecionado').removeClass('selecionado');
        $('.cor').eq(0).addClass('selecionado');
    });
});

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

    for(let i = 0; i < 7; i++) {
        if($(`input[type='checkbox']`).eq(i).is(':checked')){
            tr.find('td').eq(i + 1).html('');
            tr.find('td').eq(i + 1).append(`<div class="evento" style="background-color: #${$('.selecionado').attr("id")}">${$('#evento').val()}</div>`);
        }
    }
}

// Adiciona a Tr com o evento
function adicionarTr(novoHorario, horario){
    console.log(`style="background-color: #${$('.selecionado').attr("id")}>`);
    novoHorario = transformaStringHorario(novoHorario);
    horario = transformaStringHorario(horario);
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