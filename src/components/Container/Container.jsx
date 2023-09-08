import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ModalTeam, TeamBTN } from 'components';

import css from './Container.module.css';

const Container = ({ children }) => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false)
  };

  const openModal = () => {
    setOpen(true)
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (open) {
      body.classList.add('hidden')
    };
    return () => body.classList.remove('hidden')
  }, [open]);

  return (
    <div className={isLoggedIn ? css.containerLoggedIn : css.container}>
      {children}
      <TeamBTN handler={openModal} />
      {open && <ModalTeam close={closeModal} />}
    </div>
  )
};

export default Container;