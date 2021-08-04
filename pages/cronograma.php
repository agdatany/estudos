<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type='text/javascript' src='//code.jquery.com/jquery-compat-git.js'></script>
<script type='text/javascript' src='//igorescobar.github.io/jQuery-Mask-Plugin/js/jquery.mask.min.js'></script>

<section class="cronograma">
    <h1>Cronograma</h1>
    <table class="cronograma">
        <tr>
            <th>Horários</th>
            <th>Dom</th>
            <th>Seg</th>
            <th>Ter</th>
            <th>Qua</th>
            <th>Qui</th>
            <th>Sex</th>
            <th>Sab</th>
        </tr>

        <?php
            require('php/cronograma_pegar.php');
        ?>

        <!-- <tr>
            <td><div class="horario">08:00</div></td>
            <td><div class="evento">Matemática</div></td>
            <td><div class="evento">Estudar português e</div></td>
            <td><div class="evento">hdusahdaisfhuidhasds</div></td>
            <td><div class="evento">Matemática</div></td>
            <td><div class="evento">Matemática</div></td>
            <td><div class="evento">Matemática</div></td>
            <td><div class="evento">Matemática</div></td>
        </tr> -->
    </table>

    <div class="editar-cronograma">
        <h1>Editar cronograma</h1>
        <form id="formEditar" action="" method="POST">
            <label class="obg" for="evento">Evento:</label>
            <input type="text" name="evento" id="evento" maxlength="20" placeholder="Nome do evento">
            <label class="obg">Dias da semana:</label>
            <div class="opcoes">
                <div class="opcao">
                    <input type="checkbox" name="domingo" id="domingo">
                    <label for="domingo">Domingo</label>
                </div>
                <div class="opcao">
                    <input type="checkbox" name="segunda" id="segunda">
                    <label for="segunda">Segunda</label>
                </div>
                <div class="opcao">
                    <input type="checkbox" name="terca" id="terca">
                    <label for="terca">Terça</label>
                </div>
                <div class="opcao">
                    <input type="checkbox" name="quarta" id="quarta">
                    <label for="quarta">Quarta</label>
                </div>
                <div class="opcao">
                    <input type="checkbox" name="quinta" id="quinta">
                    <label for="quinta">Quinta</label>
                </div>
                <div class="opcao">
                    <input type="checkbox" name="sexta" id="sexta">
                    <label for="sexta">Sexta</label>
                </div>
                <div class="opcao">
                    <input type="checkbox" name="sabado" id="sabado">
                    <label for="sabado">Sábado</label>
                </div>
            </div>
            <label class="obg" for="horario">Horário:</label>
            <input type="time" name="horario" id="horario">
            <label for="descricao">Descrição:</label>
            <input type="text" name="descricao" id="descricao" placeholder="Descrição do evento">
            <label for="notificar">Receber notificações:</label>
            <select name="notificar" id="notificar">
                <option value="1">Sim</option>
                <option value="0">Não</option>
            </select>
            <div class="retorno">
            </div>
            <div class="botoes">
                <input type="submit" id="adicionar" value="Adicionar">
                <input type="submit" id="alterar" value="Alterar">
                <input type="submit" id="remover" value="Remover">
            </div>
        </form>
    </div>
</section>

<script src="js/cronograma.js"></script>