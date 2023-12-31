import React from 'react';

import css from './TeamBTN.module.css';

export default function TeamBTN({ handler }) {
  return (
    <div className={css.btn__container}>
      <svg
        type="button"
        className={css.team__icon}
        onClick={handler}
        alt="team button"
        width="565"
        height="97"
        viewBox="0 0 565 197"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className={css.team__path}>
          d="M1 82.619C1 82.619 11.5 14.619 22 3.40468C32.5 -7.80968 256 23.119 252 36.119C248 49.119 124.5 111.619 104.5 111.619C93.8018 109.327 51.9333 41.7146 36.5 18.119C24.4919 -0.239866 12.2336 109.881 9.5 148.619C12.3558 170.038 61.5 140.119 83 105.619C87.4064 101.263 27 134.619 24.5 157.619C23.749 164.529 136 163.619 195 192.619C212.663 195.313 142.955 156.119 133.5 116.119C128.494 94.94 213.5 203.619 225.5 195.119C231.938 196.55 215.033 65.0929 260 45.619C323.5 18.119 453 183.619 565 148.119" stroke="black"
        </path>
      </svg>
    </div>
  );
}
