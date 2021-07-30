<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Study</title>
        <link rel="stylesheet" href="css/style.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="fonts/fontawesome-free-5.15.3-web/css/all.css">
    </head>
    <body>
        <?php
            $url = isset($_GET['url']) ? $_GET['url'] : 'home';
        ?>

        <header>
            <nav>
                <ul>
                    <li><a href="home">Página inicial</a></li>
                    <li><a href="cronograma">Cronograma</a></li>
                    <li><a href="simulados">Simulados</a></li>
                    <li><a href="questoes">Questões</a></li>
                    <li><a href="lista-de-tarefas">Lista de tarefas</a></li>
                    <li><a href="resumos">Resumos</a></li>
                </ul>
            </nav>
        </header>
        <main>
            <?php
                if(file_exists('pages/'.$url.'.php')){
                    include('pages/'.$url.'.php');
                }
                else{
                    include('pages/erro404.php');
                }
            ?>
        </main>
        <footer>
            <p>Página desenvolvida por <a target="_blank" href="https://twitter.com/adjasente">Agda Taniguchi</a></p>
        </footer>
    </body>
</html>