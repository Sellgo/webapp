import React from 'react';
/* Styles */
import styles from './index.module.scss';

/* Types */
import { NavbarBarBottomOption } from '../../../interfaces/Admin';

interface Props {
  option: NavbarBarBottomOption;
  mainOptionClassName: string;
  handleClick: (key: string) => void;
}

const SidebarBottomButtons = (props: Props) => {
  const { option, mainOptionClassName, handleClick } = props;

  /* If nav has no sub options */
  return (
    <div
      className={`${styles.mainOption} 
                        ${mainOptionClassName}
                    `}
      onClick={() => {
        handleClick(option.key);
      }}
    >
      <div className={styles.navIcon}>
        <img src={option.icon} alt="nav-icon" />
      </div>
      <p className={styles.navLabel}>{option.label}</p>
    </div>
  );
};
export default SidebarBottomButtons;
