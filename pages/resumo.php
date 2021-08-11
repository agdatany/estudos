<section class="resumo">
    <?php
        include('parsedown/parsedown.php');

        $Parsedown = new Parsedown();

        echo $Parsedown->text(file_get_contents('pages/resumos-md/botanica.md'));
    ?>
</section>