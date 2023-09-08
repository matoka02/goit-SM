import { useSelector } from 'react-redux';

import { Icon } from 'components';
import css from './ProductList.module.css';

const ProductList = ({ list, remove }) => {
  const lang = useSelector(state => state.user.lang);
  const idx = lang.lang === 'ua' ? 0 : 1;

  return (
    <>
      {list.length === 0 && <p className={css.empty}>{lang.emptyText}</p>}
      <ul className={css.list}>
        {list.map(({ _id, name, weight, calories }) => (
          <li key={_id} className={css.product}>
            <p className={css.title}>{name.length === 1 ? name[0] : name[idx]}</p>
            <p className={css.info}>{weight} g</p>
            <p className={css.kcal}>{calories} kcal</p>
            <Icon
              className={css.icon}
              icon='close'
              width='12'
              height='12'
              onClick={() => remove(_id, calories)}
            />
          </li>
        ))}
      </ul>
    </>
  )
};

export default ProductList;