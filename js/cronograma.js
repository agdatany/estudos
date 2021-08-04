$(document).ready(function(){
    $('#adicionar').click(function(){
        var dados = $('#formEditar').serialize();

        $.ajax({
            method: 'POST',
            url: './php/cronograma_add.php',
            data: dados,
        })

        .done(function(msg){
            $(".retorno").css("display", "block");
            $(".retorno").html(msg);
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
});