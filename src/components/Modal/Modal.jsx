import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, style, children }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  });
  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return window.removeEventListener('keydown', closeModal);
  });

  const closeModal = evt => {
    if (evt.code === 'Escape') {
      onClose()
    };
  };

  const handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    };
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal} style={style}>
        {children}
      </div>
    </div>,
    modalRoot
  )
};

export default Modal;