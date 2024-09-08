<?php
include 'db.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'];
$password = $data['password'];

$sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Генерируем токен (для простоты это просто строка "token")
    $token = bin2hex(random_bytes(16));
    echo json_encode(['success' => true, 'token' => $token]);
} else {
    echo json_encode(['success' => false]);
}

$conn->close();
?>




