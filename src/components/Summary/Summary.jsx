import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { HarmfulProductsList } from 'components';
import css from './Summary.module.css';

const Summary = () => {
  const dailyRate = useSelector(state => state.user.userData.dailyRate);
  const consumed = useSelector(state => state.product.consumed);
  const date = useSelector(state => state.product.date) || '';
  const lang = useSelector(state => state.user.lang);

  return (
    <div className={css.container}>
      {dailyRate ? (
        <>
          <div>
            <h2 className={css.title}>
              {lang.summaryTitle}{' '}
              <span>{date.replaceAll('-', '/')}</span>
            </h2>
            <ul className={css.summary}>
              <li className={css.item}>
                <p>{lang.leftTitle}</p>
                <p>{dailyRate - consumed}{lang.kcal}</p>
              </li>
              <li className={css.item}>
                <p>{lang.consumedTitle}</p>
                <p>{consumed}{lang.kcal}</p>
              </li>
              <li className={css.item}>
                <p>{lang.dailyRateTitle}</p>
                <p>{dailyRate}{lang.kcal}</p>
              </li>
              <li className={css.item}>
                <p>{lang.percentNormal}</p>
                <p>{((consumed / dailyRate) * 100).toFixed(2)}{' '}%</p>
              </li>
            </ul>
          </div>
          <div>
            <h2 className={css.title}>{lang.notRecommended}</h2>
            <HarmfulProductsList />
          </div>
        </>
      ) : (
        <div>
          <p className={css.note}>{lang.summaryNote}</p>
          <Link to='/calculator' className={css.link}>
            {lang.summaryLink}
          </Link>
        </div>
      )}
    </div>
  )
};

export default Summary;