<?php
// API PHP đơn giản để học cách React gọi backend.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

$users = [
    ["id" => "u-1", "name" => "Nguyễn An", "email" => "an@example.com", "role" => "admin"],
    ["id" => "u-2", "name" => "Trần Bình", "email" => "binh@example.com", "role" => "member"],
    ["id" => "u-3", "name" => "Lê Chi", "email" => "chi@example.com", "role" => "member"]
];

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    echo json_encode([
        "data" => $users
    ]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $body = json_decode(file_get_contents("php://input"), true);

    $newUser = [
        "id" => "u-" . time(),
        "name" => $body["name"] ?? "User mới",
        "email" => $body["email"] ?? "new@example.com",
        "role" => $body["role"] ?? "member"
    ];

    echo json_encode([
        "message" => "Tạo user thành công",
        "data" => $newUser
    ]);
    exit;
}

http_response_code(405);
echo json_encode([
    "message" => "Method not allowed"
]);
