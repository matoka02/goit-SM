import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useWidth } from 'hooks/useWidth';
import { Logo, NavBar, UserMenu } from 'components';
import css from './Header.module.css';

const Header = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const [hidden, setHidden] = useState(false);
  const width = useWidth();

  const onClick = () => {
    setHidden(state => !state)
  };

  return (
    <header>
      <div className={css.container}>
        <Logo width={width} isLoggedIn={isLoggedIn} />
        <NavBar hidden={hidden} />
      </div>
      <div className={css.line}></div>
      {isLoggedIn && <UserMenu onClick={onClick} />}
    </header>
  )
};

export default Header;