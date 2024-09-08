import React, { useEffect, useState } from 'react';
import { Calendar as AntCalendar, Badge } from 'antd';
import axios from 'axios';

const Calendar: React.FC = () => {
  const [vacations, setVacations] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost/solution_vacation/server/vacations.php')
      .then(response => {
        setVacations(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the vacations!', error);
      });
  }, []);

  const getListData = (value: any) => {
    let listData: { type: 'success' | 'processing' | 'error' | 'default' | 'warning'; content: string }[] = [];
    const dateStr = value.format('YYYY-MM-DD');
    vacations.forEach(vacation => {
      if (vacation.start_date <= dateStr && vacation.end_date >= dateStr) {
        listData.push({ type: 'success', content: vacation.employee });
      }
    });
    return listData;
  };

  const dateCellRender = (value: any) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return <AntCalendar dateCellRender={dateCellRender} />;
};

export default Calendar;






