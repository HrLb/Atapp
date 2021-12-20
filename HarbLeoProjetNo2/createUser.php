<?php
require_once("php/functions.php");
if (!(isset($_POST['pseudo']) && isset($_POST['mdp']))){
    header("location:index.php");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jeu de plateforme - created user</title>
    <link rel="stylesheet" href="./css/main.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="icon" href="./images/surplace.gif" type="image/x-icon">
</head>

<body>
    <div class="position-absolute top-50 start-50 translate-middle text-center">
        <?php
        $pseudo = filter_input(INPUT_POST, 'pseudo', FILTER_SANITIZE_STRING);
        $mdp = filter_input(INPUT_POST, 'mdp', FILTER_SANITIZE_STRING);

        if($pseudo == ""){
            echo '<h1 class="fw-light">Error</h1>';
            echo '<h2 class="fw-light">User must have a username</h2>';
        }
        elseif($mdp == "" || strlen($mdp) < 8 ){
            echo '<h1 class="fw-light">Error</h1>';
            echo "<h2 class=\"fw-light\">Password must contain at least : \n - 8 characters \n and is recommended to contain : \n - Numbers \n - Capital letters \n - Symbols</h2>";
        }
        elseif (AddUser($pseudo, $mdp)) {
            echo '<h1 class="fw-light">User created with success</h1>';
        }else{
            echo '<h1 class="fw-light">Username already in use</h1>';
        }




        // $bd = CoToBase();

        // $requete = $bd->prepare("SELECT pseudo FROM platformer.utilisateur");

        // $basePseudos = "";

        // $requete->execute();

        // $result = $requete->fetchAll();

        // var_dump($result);
        ?>
        



        <a class="btn btn-light" href="index.php">
            Go back to main page
        </a>
    </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

</html>