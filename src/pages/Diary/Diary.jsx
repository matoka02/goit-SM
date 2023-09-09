import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getUserProducts, deleteUserProducts } from 'redux/product/productOperations';
import { useWidth } from 'hooks/useWidth';
import { ProductList, Summary, ProductForm, Icon, Calendar, Modal, Button, WeightForm, } from 'components';
import css from '../index.module.css';

const Diary = () => {
  const products = useSelector(state => state.product.products);
  const date = useSelector(state => state.product.date);
  const lang = useSelector(state => state.user.lang);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState();

  const dispatch = useDispatch();
  const width = useWidth();

  useEffect(() => {
    dispatch(getUserProducts(date))
  }, [date, dispatch]);

  const remove = () => {
    dispatch(deleteUserProducts({ date, product }));
    setIsModalOpen(false);
  };

  const close = () => {
    setIsModalOpen(false)
  };

  const openModal = (id, calories) => {
    setProduct({ id, calories });
    setIsModalOpen(true);
  };

  return (
    <div className={css.container}>
      <div className={css.side}>
        <Calendar />
        <WeightForm />
        {width > 767 && <ProductForm />}
        <ProductList list={products ?? []} remove={openModal} />
      </div>
      <Link to='/form' className={css.button} >
        <Icon icon='plus' width='14' height='14' />
      </Link>
      <Summary />
      {isModalOpen && (
        <Modal onClose={close} style={{ width: 280, height: 160 }} >
          {lang.confirm}
          <div className={css.thumb} >
            <Button cn='width90' onClick={remove}>
              {lang.buttonYes}
            </Button>
            <Button cn='width90' onClick={close}>
              {lang.buttonYes}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  )
};

export default Diary;