import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { chooseDate } from 'redux/productReducers';
import { Icon } from 'components';

import css from './Calendar.module.css';


const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  useEffect(() => {
      const changeDate = () => {
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          dispatch(chooseDate(day + '-' + month + '-' + year));
      };
      changeDate();
  }, [dispatch, date]);

  return (
      <div className={css.container}>
          <DatePicker
              maxDate={new Date()}
              selected={date}
              onChange={date => setDate(date)}
              className={css.datePicker}
              dateFormat="dd.MM.yyyy"
          />
          <Icon className={css.icon} icon={`calendar`} width="22" height="22" />
      </div>
  );
};

export default Calendar;