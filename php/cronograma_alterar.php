<?php
    $err = false;

    $evento = filter_var($_POST['evento'], FILTER_SANITIZE_STRING);
    $dias_semana = [];
    $domingo = isset($_POST['domingo']) ? array_push($dias_semana, 'dom') : null;
    $segunda = isset($_POST['segunda']) ? array_push($dias_semana, 'seg') : null;
    $terca = isset($_POST['terca']) ? array_push($dias_semana, 'ter') : null;
    $quarta = isset($_POST['quarta']) ? array_push($dias_semana, 'qua') : null;
    $quinta = isset($_POST['quinta']) ? array_push($dias_semana, 'qui') : null;
    $sexta = isset($_POST['sexta']) ? array_push($dias_semana, 'sex') : null;
    $sabado = isset($_POST['sabado']) ? array_push($dias_semana, 'sab') : null;
    $horario = $_POST['horario'];
    $descricao = filter_var($_POST['descricao'], FILTER_SANITIZE_STRING);
    $notificar = $_POST['notificar'];

    if(count($dias_semana) == 0){
        $err = true;
        $retorno = 'Selecione pelo menos um dia da semana!';
    }
    
    if($err == false){
        try{
            require('conectar.php');

            forEach($dias_semana as $cont){
                // Adicionar por último depois o id_cronograma
                $comando = $conexao->prepare("INSERT INTO evento (titulo, descricao, dia_semana, horario, receber_notificacao) VALUES (?, ?, ?, ?, ?)");
                
                $comando -> bindParam(1, $evento);
                $comando -> bindParam(2, $descricao);
                $comando -> bindParam(3, $cont);
                $comando -> bindParam(4, $horario);
                $comando -> bindParam(5, $notificar);
                
                $comando -> execute();
            }
            
            if($comando -> rowCount() > 0){
                $retorno = 'Cadastro realizado com sucesso!';
            }
            else{
                $retorno = 'Erro no processo de cadastro!';
            }
        }
        catch(PDOException $erro){
            $retorno = 'Erro na conexão, entrar em contato com TI '.$erro->getMessage();
        }
    }

echo $retorno;