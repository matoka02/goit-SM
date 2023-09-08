import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ReactComponent as LinkedInIcon } from '../../images/team/linkedin.svg';
import { ReactComponent as GitHubIcon } from '../../images/team/github.svg';
import { ReactComponent as CloseIcon } from '../../images/team/close.svg';
import tessa from '../../images/team/photo_2023-09-08_21-11-47.jpg';
import css from './ModalTeam.module.css';

const ModalTeam = ({ close }) => {
  const lang = useSelector(state => state.user.lang);

  useEffect(() => {
    const handleCloseModal = evt => {
      if (evt.code === 'Escape') close();
    };
    window.addEventListener('keydown', handleCloseModal);
    return () => window.removeEventListener('keydown', handleCloseModal);
  }, [close]);

  return ReactDOM.createPortal(
    <>
      (
      <div className={css.backdrop}>
        <div className={css.team__container}>
          <CloseIcon className={css.close__icon} onClick={close} />
          <div className={css.card__wrapper}>
            <div className={css.card}>
              <img src={tessa} alt="1" className={css.img} width='260' height='260' />
            </div>
            <div className={css.title__container}>
              <h3 className={css.member__title}>{lang.titleChuchin}</h3>
              <p className={css.role__text}>{lang.Chuchin}</p>
            </div>
            <ul className={css.social__list}>
              <li className={css.list__item}>
                <a
                  className={css.social__link}
                  href="https://github.com/matoka02"
                  target="blank"
                >
                  <GitHubIcon className={css.github} />
                </a>
              </li>
              <li className={css.list__item}>
                <a
                  className={css.social__link}
                  href="https://www.linkedin.com"
                  target="blank"
                >
                  <LinkedInIcon className={css.linkin} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      )
    </>,
    document.body
  )
};

export default ModalTeam;
