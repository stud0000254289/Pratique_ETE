// script.js

document.addEventListener("DOMContentLoaded", function () {
    loadEmployees();
    loadVacations();
    loadCalendar();

    function loadEmployees() {
        fetch("server/employees.php")
            .then(response => response.json())
            .then(data => {
                const employeeList = document.getElementById("employeeList");
                employeeList.innerHTML = "";
                data.forEach(employee => {
                    const div = document.createElement("div");
                    div.textContent = employee.name;
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
                    row.insertCell(1).textContent = vacation.start_date;
                    row.insertCell(2).textContent = vacation.end_date;
                    row.insertCell(3).textContent = vacation.days;
                });
            });
    }

    function loadCalendar() {
        fetch("server/vacations.php")
            .then(response => response.json())
            .then(data => {
                const calendar = document.getElementById("calendar");
                calendar.innerHTML = "";
                data.forEach(vacation => {
                    const div = document.createElement("div");
                    div.textContent = `${vacation.employee_name}: ${vacation.start_date} - ${vacation.end_date}`;
                    calendar.appendChild(div);
                });
            });
    }
});
