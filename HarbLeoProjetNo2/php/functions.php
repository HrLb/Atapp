<?php
require("connect.php");


function AddUser($pseudo, $mdp)
{
    try {
        $bd = CoToBase();

        $requete = $bd->prepare("SELECT pseudo FROM platformer.utilisateur");

        $requete->execute();

        $result = $requete->fetchAll();


        $exist = false;

        foreach ($result as &$basePseudo) {
            if ($basePseudo[0] == $pseudo) {
                $exist = true;
            }
        }

        if (!$exist) {
            $sel =  bin2hex(openssl_random_pseudo_bytes(15));
            $mdpHash = sha1($mdp . $sel);
            $requete = $bd->prepare("INSERT INTO platformer.utilisateur(pseudo, mdp, sel) VALUES(:pseudo, :mdp, :sel)");

            $requete->bindParam(':pseudo', $pseudo, PDO::PARAM_STR);
            $requete->bindParam(':mdp', $mdpHash, PDO::PARAM_STR);
            $requete->bindParam(':sel', $sel, PDO::PARAM_STR);

            $requete->execute();
        }

        return !$exist;
    } catch (Exception $e) {
        echo 'Exception reçue : ',  $e->getMessage(), "\n";
    }
}


function Login($pseudo, $mdp)
{
    $baseMdp = "";
    $sel = "";
    try {
        $bd = CoToBase();
        $requete = $bd->prepare("SELECT mdp, sel FROM platformer.utilisateur WHERE pseudo = :pseudo");

        $requete->bindParam(':pseudo', $pseudo, PDO::PARAM_STR);

        $baseMdp = "";
        $sel = "";

        $requete->execute();

        $result = $requete->fetchAll();

        $baseMdp = $result[0]['mdp'];
        $sel = $result[0]['sel'];
    } catch (Exception $e) {
        echo 'Exception reçue : ',  $e->getMessage(), "\n";
    }


    if (sha1($mdp . $sel) == $baseMdp) {
        $_SESSION['pseudo'] = $pseudo;
        return true;
    } else {
        return false;
    }
}


function GetScores()
{
    try {
        $bd = CoToBase();

        $requete = $bd->prepare("SELECT DISTINCT u.pseudo
        FROM platformer.score s
        JOIN platformer.utilisateur u 
        ON u.idUtilisateur = s.idUtilisateur 
        ORDER BY s.score DESC");

        $requete->execute();

        $answer = $requete->fetchAll();
        
        $requete = $bd->prepare("SELECT s.score , s.date 
        FROM platformer.score s
        JOIN platformer.utilisateur u 
        ON u.idUtilisateur = s.idUtilisateur 
        WHERE u.pseudo = :pseudo
        ORDER BY s.score DESC 
        LIMIT 1");
        $pseudo = "";
        $result = array();

        $requete->bindParam(':pseudo', $pseudo, PDO::PARAM_STR);
        foreach ($answer as $line) {
            $pseudo = $line["pseudo"];

            $requete->execute();
            $answer2 = $requete->fetch();

            array_push($result,array($pseudo, $answer2["score"], $answer2["date"]));
        }

        return $result;
    } catch (Exception $e) {
        echo 'Exception reçue : ',  $e->getMessage(), "\n";
    }
}


function SaveScore($score, $pseudo)
{
    $date = date("Y-m-d");
    try {
        $bd = CoToBase();

        $requete = $bd->prepare("SELECT idUtilisateur FROM platformer.utilisateur WHERE pseudo = :pseudo");

        $requete->bindParam(':pseudo', $pseudo, PDO::PARAM_STR);

        $requete->execute();

        $id = $requete->fetchAll()[0]['idUtilisateur'];


        $requete = $bd->prepare("INSERT INTO platformer.score(score, date, idUtilisateur) VALUES(:score, :date, :idUtilisateur)");


        $requete->bindParam(':score', $score, PDO::PARAM_STR);
        $requete->bindParam(':date', $date, PDO::PARAM_STR);
        $requete->bindParam(':idUtilisateur', $id, PDO::PARAM_STR);

        $requete->execute();
    } catch (Exception $e) {
        return ('Exception reçue : '.  $e->getMessage(). "\n");
    }
}



function GetUserScores($pseudo){
    $result = array();
    try {
        $bd = CoToBase();

        $requete = $bd->prepare("SELECT score, date 
        FROM platformer.score AS s
        JOIN platformer.utilisateur AS u
        ON u.idUtilisateur = s.idUtilisateur
        WHERE u.pseudo = :pseudo
        ORDER BY score DESC");

        $requete->bindParam(':pseudo', $pseudo, PDO::PARAM_STR);

        $requete->execute();

        return $requete->fetchAll();
    } catch (Exception $e) {
        return ('Exception reçue : '.  $e->getMessage(). "\n");
    }
    return $result;
}