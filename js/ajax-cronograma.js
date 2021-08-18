$('document').ready(function(){
    // Clicando no evento -> coloca no formulário e mostra a descrição
    $('#tabelaCronograma').click(function(e){
        if($(e.target).hasClass('evento')){
            abreModal('modal-editar');

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
                    $('#formEditar').trigger('reset');

                    // Coloca o título do evento
                    $('#evento').val(infoEvento[0].titulo);
    
                    // Verifica em qual dia da semana está e marca
                    var dias_semana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];

                    dias_semana.forEach(function(dia_semana){
                        if(dia_semana.substring(0, 3) == infoEvento[0].dia_semana){
                            $(`input[type='checkbox']#${dia_semana}`).prop('checked', true);
                        }
                    });

                    // Coloca o horário
                    $('#horario').val(infoEvento[0].horario);
                    
                    // Coloca a descrição
                    $('#descricao').val(infoEvento[0].descricao);
                    
                    // Coloca o Horário
                    $('#notificar').val(infoEvento[0].receber_notificacao);

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

    $('#confirmaResetarCronograma').click(function(){
        $('table#tabelaCronograma tbody').find('tr').not(':first').not(':last').remove();
        $('table').append("<tr><td colspan='8' id='nenhum-evento' style='border-radius: 0 0 30px 30px'>Nenhum evento por enquanto!</td></tr>");
        fechaModal();
        return false;
    });
});