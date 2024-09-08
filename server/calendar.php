<?php
include 'db.php';

$sql = "SELECT vacations.id, employees.name as employee, vacations.start_date, vacations.end_date, employees.color 
        FROM vacations 
        JOIN employees ON vacations.employee_id = employees.id";
$result = mysqli_query($conn, $sql);

$vacations = [];
while($row = mysqli_fetch_assoc($result)) {
    $vacations[] = $row;
}

echo json_encode($vacations);
mysqli_close($conn);
?>