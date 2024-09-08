<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Pratique";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

if ($data === null) {
    file_put_contents('php://stderr', "Invalid JSON received\n");
    die("Invalid JSON received");
}

$employeeId = $data['employee_id'] ?? null;
$startDate = $data['startDate'] ?? null;
$endDate = $data['endDate'] ?? null;
$days = $data['days'] ?? null;

if ($employeeId === null || $startDate === null || $endDate === null || $days === null) {
    file_put_contents('php://stderr', "Missing required fields\n");
    die("Missing required fields");
}

// Debugging
file_put_contents('php://stderr', print_r($data, TRUE));

$sql = "INSERT INTO vacations (employee_id, start_date, end_date, days) VALUES ('$employeeId', '$startDate', '$endDate', '$days')";

// Log the SQL query for debugging
file_put_contents('php://stderr', "SQL Query: $sql\n");

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    // Log the SQL error for debugging
    file_put_contents('php://stderr', "SQL Error: " . $conn->error . "\n");
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>






