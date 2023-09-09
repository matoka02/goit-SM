import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { setDailyRate } from 'redux/userOperations';
import { Modal, Button, Icon } from 'components';
import css from './CalculatorForm.module.css';
import HarmfulProductsList from 'components/HarmfulProductsList/HarmfulProductsList';

const CalculatorForm = ({ submit = true }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [rate, setRate] = useState();
  const [blood, setBlood] = useState();
  const date = useSelector(state => state.product.date);
  const lang = useSelector(state => state.user.lang);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
  } = useForm({ mode: 'onSumbit' });
  const dispatch = useDispatch();

  const onSubmit = data => {
    const { height, desiredWeight, age, weight, bloodGroup } = data;
    const dailyRate =
      10 * weight +
      6.25 * height -
      5 * age -
      161 -
      10 * (weight - desiredWeight);
    setRate(dailyRate);
    setBlood(bloodGroup);
    if (submit)
      dispatch(setDailyRate({ date, dailyRate, weight, bloodGroup }));
    else setIsShowModal(true);
    reset();
  };

  const close = () => {
    setIsShowModal(false);
  };

  const confirm = () => {
    setIsShowModal(false);
    navigate('/register');
  };

  const getClass = n => (watch('bloodGroup') === n ? css.checked : css.label);

  return (
    <div className={css.container}>
      <h2 className={css.title}>
        {lang.caclulateTitleStart} <br />
        {lang.caclulateTitleFinish}
      </h2>
      <form>
        <div className={css.form}>
          <label>
            <input
              className={css.input}
              type="number"
              {...register('height', {
                required: lang.requiredField,
                min: {
                  value: 100,
                  message: lang.heightRange,
                },
                max: {
                  value: 220,
                  message: lang.heightRange,
                },
              })}
              placeholder={lang.placeholderHeight}
            />
            <p className={css.error}>
              {errors?.height ? (`* ${errors.height.message}`) : (<>&nbsp;</>)}
            </p>
          </label>
          <label>
            <input
              className={css.input}
              type="number"
              {...register('age', {
                required: lang.requiredField,
                min: {
                  value: 15,
                  message: lang.ageRange,
                },
                max: {
                  value: 99,
                  message: lang.ageRange,
                },
              })}
              placeholder={lang.placeholderAge}
            />
            <p className={css.error}>
              {errors?.age ? (`* ${errors.age.message}`) : (<>&nbsp;</>)}
            </p>
          </label>
          <label>
            <input
              className={css.input}
              type="number"
              {...register('weight', {
                required: lang.requiredField,
                min: {
                  value: 40,
                  message: lang.weightRange,
                },
                max: {
                  value: 250,
                  message: lang.weightRange,
                },
              })}
              placeholder={lang.placeholderWeight}
            />
            <p className={css.error}>
              {errors?.weight ? (`* ${errors.weight.message}`) : (<>&nbsp;</>)}
            </p>
          </label>
          <label>
            <input
              className={css.input}
              type="number"
              {...register('desiredWeight', {
                required: lang.requiredField,
                min: {
                  value: 40,
                  message: lang.desiredWeightRange,
                },
                max: {
                  value: 120,
                  message: lang.desiredWeightRange,
                },
              })}
              placeholder={lang.placeholderDesiredWeight}
            />
            <p className={css.error}>
              {errors?.desiredWeight ? (`* ${errors.desiredWeight.message}`) : (<>&nbsp;</>)}
            </p>
          </label>
          <legend className={css.legend}>{lang.bloodType}</legend>
          <fieldset className={css.group} {...register('bloodGroup')}>
            <div className={css.btns}>
              <label className={getClass('1')}>
                <input
                  className={css.radio}
                  type="radio"
                  {...register('bloodGroup')}
                  value={1}
                  defaultChecked
                />
                &nbsp;1
              </label>
              <label className={getClass('2')}>
                <input
                  className={css.radio}
                  type="radio"
                  value={2}
                  {...register('bloodGroup')}
                />
                &nbsp;2
              </label>
              <label className={getClass('3')}>
                <input
                  className={css.radio}
                  type="radio"
                  value={3}
                  {...register('bloodGroup')}
                />
                &nbsp;3
              </label>
              <label className={getClass('4')}>
                <input
                  className={css.radio}
                  type="radio"
                  value={4}
                  {...register('bloodGroup')}
                />
                &nbsp;4
              </label>
            </div>
          </fieldset>
        </div>
        <Button
          cn="width"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          {lang.buttonStartloseweight}
        </Button>
      </form>
      {isShowModal && (
        <Modal onClose={close}>
          <Icon
            className={css.icon}
            icon="close"
            width="12"
            height="12"
            onClick={close}
          />
          <div className={css.modalContainer}>
            <div className={css.close}>
              <Icon
                className={css.goBack}
                icon="goBack"
                width="15"
                height="9"
                onClick={close}
              />
            </div>
            <p className={css.modalTitle}>
              {lang.modalTitleStart}
              <br /> {lang.modalTitleFinish}
            </p>
            <p className={css.rate}>
              <span className={css.value}>{rate}</span>
              &nbsp;&nbsp;kcal
            </p>
            <div className={css.line}></div>
            <p className={css.text}>{lang.modalListTitle}</p>
            <HarmfulProductsList blood={blood} />
            <Button cn="modal" type="submit" onClick={confirm}>
              {lang.buttonStartloseweight}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CalculatorForm;