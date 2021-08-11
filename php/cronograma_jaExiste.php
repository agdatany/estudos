<?php

function eventoJaExiste($conexao, $horario, $dia_semana){
    $comando = $conexao->prepare("SELECT id_evento, titulo, descricao, dia_semana, horario FROM evento WHERE dia_semana = ? AND horario = ?");
    
    $comando -> bindParam(1, $dia_semana);
    $comando -> bindParam(2, $horario);

    if(strlen($comando -> execute()) > 0){
        if($comando -> rowCount() > 0){
           return true;
        }
        else{
            return false;
        }
    }
}