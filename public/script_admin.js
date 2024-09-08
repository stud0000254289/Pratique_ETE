// script_admin.js

document.addEventListener("DOMContentLoaded", function () {
    // Загрузка списка сотрудников
    loadEmployees();

    // Загрузка таблицы отпусков
    loadVacations();

    // Добавление нового сотрудника
    document.getElementById("addEmployeeBtn").addEventListener("click", function () {
        openDialog("employeeDialog");
    });

    // Добавление нового отпуска
    document.getElementById("addVacationBtn").addEventListener("click", function () {
        openDialog("vacationDialog");
    });

    // Закрытие диалога добавления сотрудника
    document.getElementById("cancelBtn").addEventListener("click", function () {
        closeDialog("employeeDialog");
    });

    // Закрытие диалога добавления отпуска
    document.getElementById("vacationCancelBtn").addEventListener("click", function () {
        closeDialog("vacationDialog");
    });

    // Форма добавления сотрудника
    document.getElementById("employeeForm").addEventListener("submit", function (e) {
        e.preventDefault();
        addEmployee();
    });

    // Форма добавления отпуска
    document.getElementById("vacationForm").addEventListener("submit", function (e) {
        e.preventDefault();
        addVacation();
    });

    function loadEmployees() {
        fetch("server/employees.php")
            .then(response => response.json())
            .then(data => {
                const employeeList = document.getElementById("employeeList");
                employeeList.innerHTML = "";
                data.forEach(employee => {
                    const div = document.createElement("div");
                    div.textContent = employee.name;
                    div.dataset.id = employee.id;
                    employeeList.appendChild(div);
                });
            });
    }

    function loadVacations() {
        fetch("server/vacations.php")
            .then(response => response.json())
            .then(data => {
                const vacationTable = document.getElementById("vacationTable").getElementsByTagName("tbody")[0];
                vacationTable.innerHTML = "";
                data.forEach(vacation => {
                    const row = vacationTable.insertRow();
                    row.insertCell(0).textContent = vacation.employee_name;
                    row.insertCell(1).textContent= vacation.start_date;
                    row.insertCell(2).textContent = vacation.end_date;
                    row.insertCell(3).textContent = vacation.days;
                });
            });
    }

    function openDialog(dialogId) {
        document.getElementById(dialogId).style.display = "block";
    }

    function closeDialog(dialogId) {
        document.getElementById(dialogId).style.display = "none";
    }

    function addEmployee() {
        const formData = new FormData(document.getElementById("employeeForm"));
        fetch("server/add_employee.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadEmployees();
                closeDialog("employeeDialog");
            } else {
                alert("Error adding employee");
            }
        });
    }

    function addVacation() {
        const formData = new FormData(document.getElementById("vacationForm"));
        fetch("server/add_vacation.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadVacations();
                closeDialog("vacationDialog");
            } else {
                alert("Error adding vacation");
            }
        });
    }
});
