import css from './Button.module.css';

const Button = ({ cn, type = 'button', onClick, children }) => {
  const className = css[cn] || css.button;
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;