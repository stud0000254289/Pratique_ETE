<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Pratique";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT v.id, e.name as employee, v.start_date, v.end_date, v.days 
        FROM vacations v 
        JOIN employees e ON v.employee_id = e.id";
$result = $conn->query($sql);

$vacations = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $vacations[] = $row;
    }
} else {
    echo "0 results";
}
$conn->close();

header('Content-Type: application/json');
echo json_encode($vacations);
?>

