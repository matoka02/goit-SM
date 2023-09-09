import { CalculatorForm, Summary } from 'components';
import css from '../index.module.css';

const Calculator = () => {
  return (
    <div className={css.container}>
      <div className={css.side}>
        <CalculatorForm />
      </div>
      <Summary />
    </div>
  )
};

export default Calculator;