import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { add } from 'redux/product/productOperations';
import { useWidth } from 'hooks/useWidth';
import message from 'helpers/Message';
import { Icon, Button, Select } from 'components';
import css from './ProductForm.module.css';

const ProductForm = ({ close }) => {
  const date = useSelector(state => state.product.date);
  const [product, setProduct] = useState({ title: '', weight: '' });
  const [visibleProduct, setVisibleProduct] = useState(null);
  const allProducts = useSelector(state => state.product.allProducts);
  const lang = useSelector(state => state.user.lang);
  const dispatch = useDispatch();
  const width = useWidth();

  const onChange = (evt) => {
    if (evt.target.name === 'title' && evt.target.value !== '') {
      const array = allProducts.filter(product =>
        product.title[lang.lang].toLowerCase().includes(evt.target.value.toLowerCase())
      );
      setVisibleProduct(array);
    } else setVisibleProduct(null);
    setProduct(state => ({ ...state, [evt.target.name]: evt.target.value }))
  };

  const addProduct = () => {
    const { name, calories, weight, defaultWeight } = product;

    if (calories) {
      dispatch(add({
        date,
        product: {
          name,
          weight,
          calories: Math.round((calories * Number.parseFloat(weight)) / defaultWeight)
        },
      }));
    } else {
      message.warning(
        lang.addProductWarningSelect,
        lang.addProductWarningTry,
        lang.addProductWarningOk,
      );
      setProduct({ title: '', weight: '' });
      if (close) close();
    }
  };

  const getProduct = product => {
    setProduct({
      name: [product.title.ua, product.title.en],
      title: product.title[lang.lang],
      weight: product.weight,
      calories: product.calories,
      defaultWeight: product.weight,
    });
    setVisibleProduct(null);
  };

  const closeList = () => {
    setVisibleProduct(null);
    setProduct({ title: '', weight: '' });
  };

  return (
    <>
      <form className={css.form}>

        <input
          className={css.name}
          name='title'
          placeholder={lang.placeholderProductName}
          value={product.title}
          onChange={onChange}
          autoComplete='false'
        />

        <input
          className={css.gramm}
          name='weight'
          placeholder={lang.placeholderProductWeight}
          value={product.weight}
          onChange={onChange}
          type='number'
        />

        {width < 768 ? (
          <Button onClick={addProduct}>{lang.add}</Button>
        ) : (
          <div className={css.button} onClick={addProduct}>
            <Icon icon='plus' width='14' height='14' />
          </div>
        )}

      </form>
      {visibleProduct && (
        <Select
          products={visibleProduct}
          getProduct={getProduct}
          close={closeList}
        />
      )}
    </>
  )
};

export default ProductForm;