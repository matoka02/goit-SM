import { Icon } from 'components';

import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.container}>
      <Icon icon='load' className={css.img} />
    </div>
  )
};

export default Loader;