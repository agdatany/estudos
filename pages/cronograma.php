<section class="cronograma">
    <div class="modal modal-resetar none">
        <span>Você tem certeza que deseja resetar seu cronograma?</span>
        <span style="font-weight: bold;">Atenção: essa ação será permanente e não será possível recuperar o cronograma!</span>
        <button id="confirmaResetarCronograma">Sim, desejo limpar meu cronograma</button>
        <button class="cancelarModal">Cancelar</button>
    </div>

    <div class="editar-cronograma modal modal-editar none">
        <h1>Editar cronograma</h1>
        <form id="formEditar" action="" method="POST">
            <label class="obg" for="evento">Evento:</label>
            <input type="text" name="evento" id="evento" maxlength="20" placeholder="Nome do evento" required>
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
            <input type="time" name="horario" id="horario" required>
            <label for="descricao">Descrição:</label>
            <input type="text" name="descricao" id="descricao" placeholder="Descrição do evento">
            <label for="notificar">Receber notificações:</label>
            <select name="notificar" id="notificar">
                <option value="0">Não</option>
                <option value="1">Sim</option>
            </select>
            <label for="cor">Cor de fundo do evento:</label>
            <div class="cores">
                <div class="cor selecionado" id="f48fb1"></div>
                <div class="cor" id="ce93d8"></div>
                <div class="cor" id="ef9a9a"></div>
                <div class="cor" id="90caf9"></div>
                <div class="cor" id="9fa8da"></div>
                <div class="cor" id="b39ddb"></div>
                <div class="cor" id="80cbc4"></div>
                <div class="cor" id="b3e5fc"></div>
                <div class="cor" id="ffcc80"></div>
                <div class="cor" id="fff59d"></div>
                <div class="cor" id="ffffff"></div>
            </div>
            <div class="retorno">
            </div>
            <div class="botoes">
                <input type="submit" id="adicionar" value="Adicionar">
                <input type="submit" id="alterar" value="Alterar">
                <input type="submit" id="remover" value="Remover">
                <input type="reset" value="Limpar" id="limpar">
                <input type="reset" value="Resetar cronograma" id="resetarCronograma">
                <button type="button" class="cancelarModal">Fechar menu</button>
            </div>
        </form>
    </div>

    <div class="fundo-modal cancelarModal none"></div>
    <h1>Cronograma</h1>
    <table class="cronograma" id="tabelaCronograma">
        <thead>
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
        </thead>
        
        <tbody>
            <tr class="none"></tr>
            <?php
                require('php/cronograma_mostrar.php');
            ?>
            <tr class="none">
                <td class='td-horario'>23:59</td>
                <?php
                    for ($i = 0; $i < 7; $i++) {
                        echo '<td>-</td>';
                    }
                ?>
            </tr>
        </tbody>
    </table>

    <button class="btnAdicionarEvento"><i class="fas fa-plus"></i></button>
</section>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type='text/javascript' src='//code.jquery.com/jquery-compat-git.js'></script>
<script src="js/cronograma.js"></script>
<script src="js/ajax-cronograma.js"></script>