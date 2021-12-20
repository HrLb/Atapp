<?php
session_start();
//Connexion à la base de données
function CoToBase()
{
    try {
        $serveur = '127.0.0.1';
        $pseudo = 'root';
        $pwd = 'ro$Leo04';
        $db = 'platformer';

        static $bd = null;

        if ($bd === null) {
            $pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
            $bd = new PDO("mysql:host=$serveur;dbname=$db", $pseudo, $pwd, $pdo_options);
            $bd->exec('SET CHARACTER SET utf8');
        }

        return $bd;
    } catch (Exception $e) {
        echo 'Exception reçue : ',  $e->getMessage(), "\n";
    }
}
