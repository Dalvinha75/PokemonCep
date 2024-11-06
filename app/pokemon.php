<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


$rawInput = file_get_contents("php://input");
$input = json_decode($rawInput, true);


if (!$input || !isset($input['weight']) || !isset($input['height'])) {
    echo json_encode([
        "error" => "Invalid JSON input or 'weight' or 'height' field is missing",
        "rawInput" => $rawInput
    ]);
    exit;
}

$peso = $input['weight']; 
$altura = $input['height']; 

$imc = ($peso / ($altura * $altura)) * 100;  

$imcArredondado = round($imc);

$input['imc'] = $imcArredondado;

if ($peso < 50) {
    $input['classificacao'] = 'Leve';
} elseif ($peso <= 200) {
    $input['classificacao'] = 'Peso Médio';
} else {
    $input['classificacao'] = 'Pesado';
}

echo json_encode([
    "mensagem" => "Processamento bem-sucedido",
    "pokemon" => [
        "name" => $input['name'],
        "weight" => $input['weight'],
        "height" => $input['height'], 
        "classificacao" => $input['classificacao'],
        "imc" => $input['imc']
    ]
]);

