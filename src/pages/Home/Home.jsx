import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { google } from 'redux/auth/userReducers';
import { setToken } from 'redux/auth/userOperations';
import { CalculatorForm } from 'components';
import css from '../index.module.css';

const Home = () => {
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');
  const user = JSON.parse(searchParams.get('user'));
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken && refreshToken) {
      setToken(accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      dispatch(google({ accessToken, refreshToken, user }))
    };
  }, [accessToken, dispatch, refreshToken, user]);

  return (
    <section className={css.container}>
      <CalculatorForm submit={false} />
    </section>
  )
};

export default Home;
