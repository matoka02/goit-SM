import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { languageSelection } from '../../redux/auth/userReducers';
import { Icon } from 'components';
import css from './LanguageBar.module.css';

const LanguageBar = ({ big }) => {
  const lang = useSelector(state => state.user.lang);
  const [currentLang, setCurrentLang] = useState(lang.lang);
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('click', onClick);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKeyDown);
    }
  }, []);

  const onClick = (evt) => {
    if (evt.target.name !== 'btn') {
      setIsShow(false)
    }
  };

  const onKeyDown = (evt) => {
    if (evt.code === 'Tab' || evt.code === 'Escape') {
      setIsShow(false)
    }
  };

  const setLang = lang => {
    setCurrentLang(lang);
    dispatch(languageSelection(lang))
  };

  const showSelection = () => {
    setIsShow(state => !state)
  };

  const selectLanguage = evt => {
    setLang(evt.target.dataset.key);
    setIsShow(false)
  };

  return (
    <div className={css.container}>
      <button
        className={css.btn}
        name='btn'
        type='button'
        onClick={showSelection}
      >
        <Icon
          icon={currentLang}
          className={css.icon}
          width={big ? 48 : 24}
          height={big ? 32 : 16}
        />
      </button>
      {isShow && (
        <ul className={css.list} style={big && { top: 36 }}>
          <li data-key='ua' className={css.item} onClick={selectLanguage}>
            <Icon
              icon='ua'
              className={css.icon}
              width={big ? 48 : 24}
              height={big ? 32 : 16}
            />
            &nbsp;Українська
          </li>
          <li data-key='en' className={css.item} onClick={selectLanguage}>
            <Icon
              icon='en'
              className={css.icon}
              width={big ? 48 : 24}
              height={big ? 32 : 16}
            />
            &nbsp;English
          </li>
        </ul>
      )}
    </div>
  )
};

export default LanguageBar;