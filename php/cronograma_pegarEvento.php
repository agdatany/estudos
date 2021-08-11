<?php

function pegarEvento($conexao, $horario, $dia_semana){
    $comando = $conexao->prepare("SELECT titulo, descricao, dia_semana, horario, receber_notificacao, cor FROM evento WHERE dia_semana = ? AND horario = ?");
    
    $comando -> bindParam(1, $dia_semana);
    $comando -> bindParam(2, $horario);

    if(strlen($comando -> execute()) > 0){
        if($comando -> rowCount() > 0){
            $dados = $comando -> fetchAll();
           return json_encode($dados);
        }
        else{
            return false;
        }
    }
}