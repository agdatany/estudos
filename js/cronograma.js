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

    // Clicando no evento -> coloca no formulário e mostra a descrição
    $('#tabelaCronograma').click(function(e){

        if($(e.target).hasClass('evento')){
            abrirModal('modal-editarCronograma');
            
            var horario = ($(e.target).closest("tr")).find('td:eq(0)').text();

            var dia_semana = $(e.target).closest('table').find('th').eq($(e.target).parent().index()).text();

            var informacoes = {'horario' : horario, 'dia_semana': dia_semana};

            $.ajax({
                method: 'POST',
                url: './php/cronograma_evento.php',
                data: informacoes
            })
            
            .done(function(msg){
                try{
                    var infoEvento = JSON.parse(msg);

                    // Reseta o formulário
                    $('.formEditar').trigger('reset');

                    // Coloca o título do evento
                    $('.inpEvento').val(infoEvento[0].titulo);
    
                    // Verifica em qual dia da semana está e marca
                    var dias_semana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];

                    dias_semana.forEach(function(dia_semana){
                        if(dia_semana.substring(0, 3) == infoEvento[0].dia_semana){
                            $(`input[type='checkbox']#${dia_semana}`).prop('checked', true);
                        }
                    });

                    // Coloca o horário
                    $('.inpHorario').val(infoEvento[0].horario);
                    
                    // Coloca a descrição
                    $('.inpDescricao').val(infoEvento[0].descricao);
                    
                    // Coloca o Horário
                    $('.inpNotificar').val(infoEvento[0].receber_notificacao);

                    // Coloca a cor de fundo
                    $('.cor').removeClass('selecionado');
                    $(`#${infoEvento[0].cor}`).toggleClass('selecionado');
                }
                catch{
                    $(".retorno").html(msg);
                }
            })

            .fail(function(){
                alert("Erro de dados, tente novamente.");
            })
        }
        return false;
    });

    // Botão adicionar
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
                checkTr();
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

    // Botão alterar
    $('#alterar').click(function(){
        var dados = $('#formEditar').serialize() + '&cor=' + $('.selecionado').attr('id');

        $.ajax({
            method: 'POST',
            url: 'php/cronograma_alterar.php',
            data: dados,
        })

        .done(function(msg){
            $(".retorno").css("display", "block");
            if(msg == true){
                $('.retorno').html('Evento alterado com sucesso!');
                checkTr();
            }
            else{
                $('.retorno').html(msg);
            }
        })
        
        .fail(function(){
            $(".retorno").css("display", "block");
            $(".retorno").html("Erro de dados, tente novamente.");
        });

        return false;
    });

    // Botão remover
    $('#remover').click(function(){
        var dados = $('#formEditar').serialize();

        $.ajax({
            method: 'POST',
            url: 'php/cronograma_excluir.php',
            data: dados,
        })

        .done(function(msg){
            $(".retorno").css("display", "block");
            if(msg == true){
                $(".retorno").html("Evento removido com sucesso!");
                removerEvento();
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

    // Botão limpar
    $('#limpar').click(function(){
        $('.selecionado').removeClass('selecionado');
        $('.cor').eq(0).addClass('selecionado');
    });

    // Resetar cronograma -> Fazer depois*
    $('.resetarCronograma').click(function(){
        abrirModal('modal-resetar');
    });

    $('#confirmaResetarCronograma').click(function(){
        var contaUsuario = 1;

        $.ajax({
            method: 'POST',
            url: 'php/cronograma_resetar.php',
            data: contaUsuario,
        })

        .done(function(msg){
            if(msg == true){
                resetarCronograma();
            }
            else{
                alert('Erro encontrado, tente novamente mais tarde!');
            }
        })
        
        .fail(function(){
            alert("Erro de dados, tente novamente.");
        });

        return false;
    });

    $('.cancelarModal').click(function(){
        fecharModal();
    });

    $('.fundo').click(function(){
        fecharModal();
    });

    $('#adicionar-evento').click(function(){
        abrirModal('modal-editarCronograma');
    });
});

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
        horarioTr.remove();
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

    for(let i = 0; i < 7; i++) {
        if($(`input[type='checkbox']`).eq(i).is(':checked')){
            tr.find('td').eq(i + 1).html('');
            tr.find('td').eq(i + 1).append(`<div class="evento" style="background-color: #${$('.selecionado').attr("id")}">${$('#evento').val()}</div>`);
        }
    }
}

// Adiciona a Tr com o evento
function adicionarTr(novoHorario, horario){
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

function resetarCronograma(){
    $('tbody').remove();
    $('table').append("<tr><td colspan='8' id='nenhum-evento' style='border-radius: 0 0 30px 30px'>Nenhum evento por enquanto!</td></tr>");
}

function abrirModal(classeDaModal){
    $('.fundo').toggleClass('none');
    $('.fundo').toggleClass('flex');
    
    $(`.${classeDaModal}`).toggleClass('none');
    $(`.${classeDaModal}`).toggleClass('flex');

    $('body').css('overflow', 'hidden');
}

function fecharModal(){
    $('.fundo').addClass('none');
    $('.fundo').removeClass('flex');
    
    $('.modal').addClass('none');
    $('.modal').removeClass('flex');
    
    $('body').css('overflow', 'auto');
}