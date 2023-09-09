import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { registration } from 'redux/userOperations';
import { Button, Icon } from 'components';
import css from '../LoginForm/LoginForm.module.css';

const RegisterForm = () => {
  const [isOpenEye, setIsOpenEye] = useState(false);
  const { 
    register, 
    formState: { errors }, 
    handleSubmit, 
    reset, 
  } = useForm({ mode: 'onSubmit' });
  const lang = useSelector(state => state.user.lang);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onHandleSubmit = data => {
    data.email = data.email.toLowerCase();
    dispatch(registration(data));
    reset();
    navigate('/login');
  };

  const showPassword = () => {
    setIsOpenEye(state => !state);
  };

  return (
    <div className={css.container}>
      <form
        className={css.loginForm}
        onSubmit={handleSubmit(onHandleSubmit)}
      >
        <h2 className={css.formHeading}>{lang.registerText}</h2>

        <label className={css.formLabel}>
          <input
            {...register('name', {
              required: lang.requiredField,
              minLength: {
                value: 2,
                massage: lang.nameRange,
              },
              maxLength: 15,
            })}
            className={css.formInput}
            title={lang.nameValidation}
            placeholder={lang.namePlaceholder}
          />
          <div className={css.errorCont}>
            {errors.name && (
              <p className={css.errorText}>{errors.name.message || lang.nameNotValide}</p>
            )}
          </div>
        </label>

        <label className={css.formLabel}>
          <input
            {...register('email', {
              required: lang.requiredField,
              pattern: {
                value: /^([A-Za-z0-9_-]+\.)*[A-Za-z0-9_-]+@[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*\.[A-Za-z]{2,6}$/,
                massage: lang.invalidEmail,
              },
            })}
            className={css.formInput}
            title={lang.emailValidation}
            placeholder={lang.emailPlaceholder}
          />
          <div className={css.errorCont}>
            {errors.email && (
              <p className={css.errorText}>{errors.email.message || lang.emailNotValide}</p>
            )}
          </div>
        </label>

        <label className={css.formLabel}>
          <input
            {...register('password', {
              required: lang.requiredField,
              minLength: {
                value: 6,
                massage: lang.passwordRange,
              },
            })}
            type={isOpenEye ? 'text' : 'password'}
            className={css.formInput}
            title={lang.passwordValidation}
            placeholder={lang.passwordPlaceholder}
          />
          <Icon
            icon={isOpenEye ? 'eye' : 'closedEye'}
            className={css.icon}
            onClick={showPassword}
            width='20'
            height='20'
          />
          <div className={css.errorCont}>
            {errors.password && (
              <p className={css.errorText}>{errors.password.message || lang.passwordNotValide}</p>
            )}
          </div>
        </label>

        <Button type='submit'>Register</Button>
      </form>

      <div className={css.social}>
        <p className={css.socialTitle}>{lang.socialTitle}</p>

        <a
          className={css.googleBtn}
          href={`${process.env.REACT_APP_BASE_URL}/users/google`}
        >
          <Icon icon='google' width='26' height='26' />
          <div>
            <span className={css.blue}>G</span>
            <span className={css.red}>o</span>
            <span className={css.yellow}>o</span>
            <span className={css.blue}>g</span>
            <span className={css.green}>l</span>
            <span className={css.red}>e</span>
          </div>
        </a>

        <a
          className={css.facebookBtn}
          href={`${process.env.REACT_APP_BASE_URL}/users/facebook`}
        >
          <Icon icon='facebook' width='32' height='32' />
          facebook
        </a>

      </div>

    </div>
  )
};

export default RegisterForm;