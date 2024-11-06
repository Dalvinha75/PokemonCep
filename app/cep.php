<?php
header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit;
}


if ($input) {
    echo json_encode([
        "mensagem" => "Endereço processado com sucesso",
        "endereco" => $input
    ]);
} else {
    echo json_encode([
        "error" => "Erro ao processar o JSON ou JSON inválido recebido"
    ]);
}
