import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, DatePicker, InputNumber, Select, Calendar, Badge, Table } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const { Option } = Select;

const VacationTable: React.FC = () => {
  const [vacations, setVacations] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentVacation, setCurrentVacation] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchVacations();
    fetchEmployees();
  }, []);

  const fetchVacations = async () => {
    try {
      const vacationsResponse = await axios.get('http://localhost/solution_vacation/server/vacations.php');
      const employeesResponse = await axios.get('http://localhost/solution_vacation/server/employees.php');
      const employeesData = employeesResponse.data.reduce((acc: any, employee: any) => {
        acc[employee.name] = employee.color;
        return acc;
      }, {});

      const vacationsWithColors = vacationsResponse.data.map((vacation: any) => ({
        ...vacation,
        color: employeesData[vacation.employee],
      }));

      setVacations(vacationsWithColors);
    } catch (error) {
      console.error('There was an error fetching the vacations!', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost/solution_vacation/server/employees.php');
      setEmployees(response.data);
    } catch (error) {
      console.error('There was an error fetching the employees!', error);
    }
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setCurrentVacation(null);
    setIsModalVisible(true);
  };

  const handleEdit = (vacation: any) => {
    setIsEditMode(true);
    setCurrentVacation(vacation);
    setIsModalVisible(true);
    form.setFieldsValue({
      employee: vacation.employee,
      startDate: dayjs(vacation.start_date),
      endDate: dayjs(vacation.end_date),
      days: vacation.days,
    });
  };

  const handleDelete = async (vacationId: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот отпуск?')) {
      try {
        const response = await axios.post('http://localhost/solution_vacation/server/delete_vacation.php', { id: vacationId });
        console.log('Delete response:', response.data);
        fetchVacations();
      } catch (error) {
        console.error('There was an error deleting the vacation!', error);
      }
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const vacationData = {
        ...values,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate.format('YYYY-MM-DD'),
        days: values.days,
        employee_id: employees.find(e => e.name === values.employee)?.id,
        id: currentVacation?.id,
      };

      console.log("Submitting data:", vacationData);

      let response;
      if (isEditMode && currentVacation) {
        response = await axios.post('http://localhost/solution_vacation/server/edit_vacation.php', vacationData, {
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        response = await axios.post('http://localhost/solution_vacation/server/add_vacation.php', vacationData, {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      console.log('Server response:', response.data);
      fetchVacations();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('There was an error saving the vacation!', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const calculateEndDate = (startDate: Dayjs, days: number) => {
    return startDate.clone().add(days - 1, 'day');
  };

  const calculateDays = (startDate: Dayjs, endDate: Dayjs) => {
    return endDate.diff(startDate, 'day') + 1;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = vacations.filter(vacation => 
      value.isBetween(dayjs(vacation.start_date), dayjs(vacation.end_date), 'day', '[]')
    );

    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.id}>
            <Badge color={item.color} text={item.employee} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Таблица отпусков</h2>
      <Button type="primary" onClick={handleAdd}>Добавить отпуск</Button>
      <Table dataSource={vacations} columns={[
        { title: 'Сотрудник', dataIndex: 'employee', key: 'employee' },
        { title: 'Дата начала', dataIndex: 'start_date', key: 'start_date' },
        { title: 'Дата окончания', dataIndex: 'end_date', key: 'end_date' },
        { title: 'Количество дней', dataIndex: 'days', key: 'days' },
        {
          title: 'Действия',
          key: 'actions',
          render: (_: any, vacation: any) => (
            <>
              <Button type="link" onClick={() => handleEdit(vacation)}>Редактировать</Button>
              <Button type="link" onClick={() => handleDelete(vacation.id)}>Удалить</Button>
            </>
          )
        }
      ]} />
      <Calendar dateCellRender={dateCellRender} />
      <Modal
        title={isEditMode ? "Редактировать отпуск" : "Добавить отпуск"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="employee" label="Сотрудник" rules={[{ required: true, message: 'Пожалуйста, выберите сотрудника!' }]}>
            <Select>
              {employees.map((employee) => (
                <Option key={employee.id} value={employee.name}>{employee.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="startDate" label="Дата начала" rules={[{ required: true, message: 'Пожалуйста, выберите дату начала!' }]}>
            <DatePicker onChange={(date) => {
              if (date && form.getFieldValue('days')) {
                form.setFieldsValue({ endDate: calculateEndDate(date, form.getFieldValue('days')) });
              }
            }} />
          </Form.Item>
          <Form.Item name="endDate" label="Дата окончания">
            <DatePicker onChange={(date) => {
              if (date && form.getFieldValue('startDate')) {
                form.setFieldsValue({ days: calculateDays(form.getFieldValue('startDate'), date) });
              }
            }} />
          </Form.Item>
          <Form.Item name="days" label="Количество дней" rules={[{ required: true, message: 'Пожалуйста, введите количество дней!' }]}>
            <InputNumber onChange={(value) => {
              if (value !== null && form.getFieldValue('startDate')) {
                form.setFieldsValue({ endDate: calculateEndDate(form.getFieldValue('startDate'), Number(value)) });
              }
            }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VacationTable;

