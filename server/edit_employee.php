<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Pratique";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
$name = $data['name'];
$hireDate = $data['hireDate'];
$projects = $data['projects'];
$color = $data['color'];

$sql = "UPDATE employees SET name='$name', hire_date='$hireDate', projects='$projects', color='$color' WHERE id='$id'";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
