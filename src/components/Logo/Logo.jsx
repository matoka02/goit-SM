import { Link } from 'react-router-dom';

import logo from 'images/logo.png';
import css from './Logo.module.css';

const Logo = ({ width, isLogged }) => {
  return (
    <Link to='/' className={css.link}>
      <img src={logo} alt='logo' className={css.logo} />
      {(isLogged || width > 767) && (
      <p className={css.text}>
        Slim <span className={css.subText}>Mom</span> 
      </p>)}
    </Link>
  )
};

export default Logo;