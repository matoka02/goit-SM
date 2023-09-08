import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logOut } from 'redux/auth/userOperations';
import { Button, Modal } from 'components';
import css from './UserMenu.module.css';

const UserMenu = ({ onClick }) => {
  const userName = useSelector(state => state.user.userData?.name);
  const lang = useSelector(state => state.user.lang);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const close = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true)
  };
  const logout = () => {
    dispatch(logOut());
    setIsModalOpen(false);
    onClick();
  };

  return (
    <div className={css.container}>

      <div className={css.userMenuWrapper}>
        <p className={css.loginName}>{userName}</p>
        <button type='button' className={css.exitBtn} onClick={openModal}>{lang.exit}</button>
      </div>

      {isModalOpen && (
        <Modal style={{ width: 280, height: 160 }} onClose={close}>
          <div className={css.modal}>
            {lang.textLogOut}
            <div className={css.thumb}>
              <Button cn="width90" onClick={logout}>{lang.buttonYes}</Button>
              <Button cn="width90" onClick={close}>{lang.buttonNo}</Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  )
};

export default UserMenu;