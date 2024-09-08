session_start();
if (!isset($_SESSION['username'])) {
    header('Location: index.html');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
</head>
<body>
<div class="container">
        <header>
            <h1>Планирование отпусков</h1>
            <a href="login.php">Admin</a>
        </header>
        <div class="main-content">
            <div class="sidebar">
                <h2>Список сотрудников</h2>
                <div id="employeeList"></div>
            </div>
            <div class="content">
                <h2>Таблица отпусков</h2>
                <table id="vacationTable">
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Days</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Data will be inserted here by script.js -->
                    </tbody>
                </table>
                <h2>Календарь</h2>
                <div id="calendar">Loading calendar...</div>
            </div>
        </div>
</div>
</body>
</html>
