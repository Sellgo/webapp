import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import { ReactComponent as AngleUpWhite } from '../../assets/images/angle-up-white.svg';
import { ReactComponent as AngleDownBlack } from '../../assets/images/angle-down-black.svg';

interface Props {
  handleClick: () => void;
  collapsed: boolean;
  collapsedColor: string;
  collapsedFontColor: string;
  collapsedArrowColor: string;
  collapsedIcon?: React.ReactNode;

  expandedColor: string;
  expandedFontColor: string;
  expandedArrowColor: string;
  expandedIcon?: React.ReactNode;

  title: string;
}

const DisplayToggle = (props: Props) => {
  const {
    handleClick,
    collapsed,
    collapsedColor,
    collapsedFontColor,
    collapsedArrowColor,
    collapsedIcon,
    expandedIcon,
    expandedFontColor,
    expandedArrowColor,
    expandedColor,
    title,
  } = props;

  return (
    <div
      className={styles.advancedFilterToggle}
      onClick={handleClick}
      style={{ background: collapsed ? collapsedColor : expandedColor }}
    >
      <div className={styles.menuIcon}>{collapsed ? collapsedIcon : expandedIcon}</div>
      <span style={{ color: collapsed ? collapsedFontColor : expandedFontColor }}>{title}</span>
      <span>
        {collapsed ? (
          <AngleDownBlack style={{ fill: collapsedArrowColor }} className={styles.arrowIcon} />
        ) : (
          <AngleUpWhite style={{ fill: expandedArrowColor }} className={styles.arrowIcon} />
        )}
      </span>
    </div>
  );
};

export default memo(DisplayToggle);
