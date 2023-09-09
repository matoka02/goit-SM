import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, Charts } from 'components';
import css from 'pages/index.module.css';

const Reports = () => {
  const [time, setTime] = useState();
  const lang = useSelector(state => state.user.lang);

  const chooseTime = isAllPeriod => setTime(isAllPeriod);

  return (
    <div className={css.reports}>
      <div className={css.thumbBtns}>
        <Button cn='chart' onClick={() => chooseTime(false)}>
          {lang.month}
        </Button>
        <Button cn='chart' onClick={() => chooseTime(true)}>
          {lang.all}
        </Button>
      </div>
      <ul className={css.legend}>
        <li className={css.item}>
          <div className={css.dailyRate}></div>
          <span>{lang.dailyRateTitle}</span>
        </li>
        <li className={css.item}>
          <div className={css.consumed}></div>
          <span>{lang.consumedTitle}</span>
        </li>
        <li className={css.item}>
          <div className={css.weight}></div>
          <span>{lang.weight}</span>
        </li>
      </ul>
      <Charts isAllTime={time} />
    </div>
  )
};

export default Reports;