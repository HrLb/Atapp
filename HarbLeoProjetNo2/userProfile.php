<?php
require("php/functions.php");
if (!isset($_SESSION["pseudo"])) {
    header("location:index.php");
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jeu de plateforme - scores</title>
    <link rel="stylesheet" href="./css/main.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="icon" href="./images/surplace.gif" type="image/x-icon">
</head>

<body>
    <div class="container">
        <?php
        require("php/nav.php");
        if (isset($_SESSION['pseudo'])) {
            $result = GetUserScores($_SESSION['pseudo']);

            if (count($result) > 0) {
                $highest = 0;
                $medium = 0;
                $i = 0;
                foreach ($result as $line) {
                    $medium += $line["score"];
                    if ($line["score"] > $highest) {
                        $highest = $line["score"];
                    }
                }
                $medium /= count($result);

        ?>
                <div class="container text-left float-start">
                    <p class="lead"><b>Best score : </b><?php echo $highest ?></p>
                    <p class="lead"><b>Medium score : </b><?php echo $medium ?></p>
                    <p class="lead"><b>Attempts : </b><?php echo count($result) ?></p>
                </div>
                <?php



                ?>
                <table class="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Score</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        foreach ($result as $line) {
                            $i++;
                        ?>
                            <tr>
                                <th scope="row"><?php echo $i ?></th>
                                <td><?php echo $line["score"] ?></td>
                                <td><?php echo $line["date"] ?></td>
                            </tr>
                        <?php
                        }
                        ?>
                    </tbody>
                </table>
            <?php






            } else {
            ?>
                <h1 class="position-absolute top-50 start-50 translate-middle">No scores yet...</h1>
            <?php
            }
        } else {
            ?>

        <?php
        }
        ?>
    </div>
</body>

</html>