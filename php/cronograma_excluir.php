<?php
$err = false;

require ('conectar.php');
require ('cronograma_pegarEvento.php');

$retorno = null;

$dias_semana = [];
$domingo = isset($_POST['domingo']) ? array_push($dias_semana, 'dom') : null;
$segunda = isset($_POST['segunda']) ? array_push($dias_semana, 'seg') : null;
$terca = isset($_POST['terca']) ? array_push($dias_semana, 'ter') : null;
$quarta = isset($_POST['quarta']) ? array_push($dias_semana, 'qua') : null;
$quinta = isset($_POST['quinta']) ? array_push($dias_semana, 'qui') : null;
$sexta = isset($_POST['sexta']) ? array_push($dias_semana, 'sex') : null;
$sabado = isset($_POST['sabado']) ? array_push($dias_semana, 'sab') : null;
$horario = !empty($_POST['horario']) ? filter_var($_POST['horario']) : $retorno = 'Adicione o horário do evento.';

if(!is_null($retorno)){
    goto retornar;
}

if(count($dias_semana) == 0){
    $retorno = 'Selecione pelo menos um dia da semana!';
    goto retornar;
}

forEach($dias_semana as $dia_semana){
    $naoExiste = pegarEvento($conexao, $horario, $dia_semana);
    if(!$naoExiste){
        $retorno = "Verifique o(s) dia(s) da semana e o horário.";
        goto retornar;
    }
}

forEach($dias_semana as $dia_semana){
    if(pegarEvento($conexao, $horario, $dia_semana)){
        $comando = $conexao->prepare("DELETE FROM evento WHERE horario = ? AND dia_semana = ?");
    
        $comando -> bindParam(1, $horario);
        $comando -> bindParam(2, $dia_semana);
    
        $comando -> execute();
    
        if($comando -> rowCount() > 0){
            $retorno = true;
        }
        else{
            $retorno = "Erro no processo de remover o evento!";
        }
    }
    else{
        $retorno = "Evento não encontrado! Certifique de colocar o dia da semana e o horário do evento.";
    }
}

retornar:
echo $retorno;