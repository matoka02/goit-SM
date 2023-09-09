import { Navigate, Link } from 'react-router-dom';

import { useWidth } from 'hooks/useWidth';
import { ProductForm, Icon } from 'components';
import css from '../index.module.css';

const MobileProductForm = () => {
  return useWidth > 767 ? (
    <Navigate to='/diary' />
  ) : (
    <section className={css.container}>
      <Link to='/' className={css.link}>
        <Icon
          icon='goBack'
          className={css.goBack}
          width='15'
          height='9'
        />
      </Link>
      <ProductForm />
    </section>
  )
};

export default MobileProductForm;
