<?php
session_start();
if (!isset($_SESSION['username'])) {
    header('Location: login.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Планирование отпусков</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Планирование отпусков</h1>
            <a href="view.php">Планирование отпусков</a>
            <a href="logout.php">Logout</a>
        </header>
        <div class="main-content">
            <div class="sidebar">
                <h2>Список сотрудников</h2>
                <button id="addEmployeeBtn">Добавить сотрудника</button>
                <div id="employeeList"></div>
            </div>
            <div class="content">
                <h2>Таблица отпусков</h2>
                <button id="addVacationBtn">Добавить отпуск</button>
                <table id="vacationTable">
                    <thead>
                        <tr>
                            <th>Сотрудник</th>
                            <th>Дата начала</th>
                            <th>Дата окончания</th>
                            <th>Количество дней</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <h2>Календарь</h2>
                <div id="calendar"></div>
            </div>
        </div>

        <div id="employeeDialog" class="dialog">
            <form id="employeeForm">
                <label for="name">Имя:</label>
                <input type="text" id="name" name="name" required>
                <label for="hireDate">Дата устройства:</label>
                <input type="date" id="hireDate" name="hireDate" required>
                <label for="projects">Проекты:</label>
                <input type="text" id="projects" name="projects" required>
                <label for="color">Цвет:</label>
                <input type="color" id="color" name="color" required>
                <button type="submit">Сохранить</button>
                <button type="button" id="cancelBtn">Отмена</button>
            </form>
        </div>

        <div id="vacationDialog" class="dialog">
            <form id="vacationForm">
                <label for="employee">Сотрудник:</label>
                <select id="employee" name="employee" required></select>
                <label for="startDate">Дата начала:</label>
                <input type="date" id="startDate" name="startDate" required>
                <label for="endDate">Дата окончания:</label>
                <input type="date" id="endDate" name="endDate" required>
                <label for="days">Количество дней:</label>
                <input type="number" id="days" name="days" required>
                <button type="submit">Сохранить</button>
                <button type="button" id="vacationCancelBtn">Отмена</button>
            </form>
        </div>

        <div id="deleteEmployeeDialog" class="dialog">
            <p>Вы уверены, что хотите удалить этого сотрудника?</p>
            <button id="confirmDeleteEmployeeBtn">Удалить</button>
            <button id="cancelDeleteEmployeeBtn">Отмена</button>
        </div>
    </div>
    <script src="script_admin.js"></script>
</body>
</html>
