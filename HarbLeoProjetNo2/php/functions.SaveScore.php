<?php

require_once("functions.php");
session_start();

header("Content-type: application/json");

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? 
trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
  //Receive the RAW post data.
  $content = trim(file_get_contents("php://input"));
  $decoded = json_decode($content, true);

  //If json_decode failed, the JSON is invalid.
  if(is_array($decoded) && isset($_SESSION['pseudo'])) {
    echo json_encode(SaveScore(intval($decoded["score"]), $_SESSION['pseudo']));
  } else {
    echo "Je ne peux pas faire";
  }
}




?>