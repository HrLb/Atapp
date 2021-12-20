<!--
Auteur : Leo Harb
date de début : 26.04.2021

Page web principale

sources : 
https://www.w3schools.com
https://stackoverflow.com/questions
-->

<?php
require("php/functions.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jeu de plateforme</title>
    <link rel="stylesheet" href="./css/main.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="icon" href="./images/surplace.gif" type="image/x-icon">
</head>

<body id="body" onclick="tire(event)">



    <div id="terrain">
        <div class="container">
            <div id="barreVie"></div>
            <div id="barreProgress"></div>

            <?php
                require("php/nav.php");

                if(isset($_SESSION['pseudo'])){
                    ?>
                    <input type="button" value="Start as <?php echo $_SESSION['pseudo']; ?>" id="pause" onclick="start()" class="btn btn-light btn-lg float-start mx-1">
                    <?php
                }else{
                    ?>
                    <input type="button" value="Start as guest" id="pause" onclick="start()" class="btn btn-light btn-lg float-start mx-1">
                    <?php
                }
            ?>
            <div id="score" class="p-3 float-start mx-1">Score : </div>
        </div>
    </div>

</body>
<script src="./js/main.js"></script>
</html>