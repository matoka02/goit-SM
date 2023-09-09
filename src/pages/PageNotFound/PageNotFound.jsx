import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button } from 'components';
import css from './PageNotFound.module.css';

const PageNotFound = () => {
  const navigate = useNavigate();
  const lang = useSelector(state => state.user.lang);

  const handleBtnClick = () => {
    navigate('/', { replace: true })
  };

  return (
    <div className={css.container}>
      <div className={css.background}>
        <h2 className={css.title}>{lang.notFoundTitle}</h2>
        <div className={css.img}></div>
        <p className={css.text}>{lang.notFoundText}</p>
        <Button onClick={handleBtnClick} >{lang.goHome}</Button>
      </div>
    </div>
  )
};

export default PageNotFound;