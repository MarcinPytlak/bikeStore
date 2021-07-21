import React from 'react';
import Popper from '@material-ui/core/Popper';
import { ShopBracket } from '../layout/ShopBracket/ShopBracket';

import styles from './Popper.modules.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

export default function SimplePopper() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <FontAwesomeIcon  icon={faShoppingBasket} aria-describedby={id} type="button" onClick={handleClick} />
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div className={styles.popper}>
            <ShopBracket />
        </div>
      </Popper>
    </div>
  );
}