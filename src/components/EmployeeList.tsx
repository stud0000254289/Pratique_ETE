import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Input, DatePicker, List, Tag } from 'antd';
import { SketchPicker } from 'react-color';
import dayjs from 'dayjs';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<any>(null);
  const [color, setColor] = useState('#fff');
  const [form] = Form.useForm();

  useEffect(() => {
    fetchEmployees();
  }, []);

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
    setCurrentEmployee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (employee: any) => {
    setIsEditMode(true);
    setCurrentEmployee(employee);
    setIsModalOpen(true);
    setColor(employee.color);
    form.setFieldsValue({
      name: employee.name,
      hireDate: dayjs(employee.hire_date),
      projects: employee.projects,
    });
  };

  const handleDelete = async (employeeId: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этого сотрудника?')) {
      try {
        await axios.post('http://localhost/solution_vacation/server/delete_employee.php', { id: employeeId });
        fetchEmployees();
      } catch (error) {
        console.error('There was an error deleting the employee!', error);
      }
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const employeeData = {
        ...values,
        hireDate: values.hireDate.format('YYYY-MM-DD'),
        color: color,
      };

      if (isEditMode && currentEmployee) {
        await axios.post('http://localhost/solution_vacation/server/edit_employee.php', { ...employeeData, id: currentEmployee.id });
      } else {
        await axios.post('http://localhost/solution_vacation/server/add_employee.php', employeeData);
      }

      fetchEmployees();
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error('There was an error saving the employee!', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <h2>Список сотрудников</h2>
      <Button type="primary" onClick={handleAdd}>Добавить сотрудника</Button>
      <List
        itemLayout="horizontal"
        dataSource={employees}
        renderItem={employee => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => handleEdit(employee)}>Редактировать</Button>,
              <Button type="link" onClick={() => handleDelete(employee.id)}>Удалить</Button>
            ]}
          >
            <List.Item.Meta
              title={employee.name}
              description={`Дата устройства: ${employee.hire_date} - Проекты: ${employee.projects}`}
            />
            <Tag color={employee.color}>{employee.projects}</Tag>
          </List.Item>
        )}
      />
      <Modal
        title={isEditMode ? "Редактировать сотрудника" : "Добавить сотрудника"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Имя" rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="hireDate" label="Дата устройства" rules={[{ required: true, message: 'Пожалуйста, выберите дату устройства!' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="projects" label="Проекты" rules={[{ required: true, message: 'Пожалуйста, введите проекты!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="color" label="Цвет в календаре">
            <SketchPicker color={color} onChangeComplete={(color) => setColor(color.hex)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeeList;
