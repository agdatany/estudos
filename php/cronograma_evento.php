<?php

require('conectar.php');
require('cronograma_pegarEvento.php');

$horario = $_POST['horario'];
$dia_semana = $_POST['dia_semana'];

$retorno = pegarEvento($conexao, $horario, $dia_semana);

echo $retorno;