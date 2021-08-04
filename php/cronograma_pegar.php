<?php
    require('php/conectar.php');
    
    $diasSemanas = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
                
    $comando = $conexao->prepare('SELECT horario, count(*) as quantidade FROM evento GROUP BY horario');

    if(strlen($comando -> execute()) > 0){
        if($comando -> rowCount() > 0){
            while($linha = $comando -> fetch(PDO::FETCH_OBJ)){
                echo "<tr>";
                echo "<td>".date('H:i', strtotime($linha->horario))."</td>";

                foreach ($diasSemanas as $diaSemana) {
                    if(checkEvento($conexao, $linha->horario, $diaSemana)){
                        colocaTD($conexao, $diaSemana, $linha->horario);
                    }
                    else{
                        echo "<td>-</td>";
                    }
                }
            }
        }
    }

    function checkEvento($conexao, $horario, $diaSemana){
        $comando = $conexao->prepare("SELECT horario, dia_semana FROM evento WHERE horario = '$horario' AND dia_semana = '$diaSemana'");

        if(strlen($comando -> execute()) > 0){
            if($comando -> rowCount() > 0){
                return true;
            }
            else{
                return false;
            }
        }        
    }

    function colocaTD($conexao, $diaSemana, $horario){

        $comando2 = $conexao->prepare("SELECT titulo, descricao FROM evento WHERE dia_semana = '$diaSemana' AND horario = '$horario'");

        if(strlen($comando2 -> execute()) > 0){
            if($comando2 -> rowCount() > 0){
                while($linha = $comando2 -> fetch(PDO::FETCH_OBJ)){
                    echo "<td><div class='evento'>".ucfirst(($linha->titulo))."</div></td>";
                }
            }
        }
    }
?>