import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import css from './Select.module.css';

const Select = ({ products, getProduct, close }) => {
  const bloodGroup = useSelector(state => state.user.userData?.bloodGroup);
  const lang = useSelector(state => state.user.lang);

  useEffect(() => {
    const onClick = evt => {
      if (evt.target.name !== 'list') close();
    };
    const onKeyDown = evt => {
      if (evt.code === 'Tab' || evt.code === 'Escape') close();
    };

    window.addEventListener('click', onClick);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKeyDown);
    }
  }, [close]);

  const getClass = product => {
    return product.groupBloodNotAllowed[bloodGroup] ? css.warning : css.item
  };

  return (
    <div className={css.container}>
      <ul className={css.list} name='list'>
        {products.map(product => (
          <li 
            key={product.title.ua} 
            className={getClass(product)} 
            onClick={() => { getProduct(product) }}
          >
            <p className={css.title}>{product.title[lang.lang]}</p>
            <div className={css.thumb}>
              <p>{product.weight}{lang.gram}</p>
              <p>{product.calories}{lang.kcal}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default Select;