import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion } from 'semantic-ui-react';

/* Components */
import BetaLabel from '../../BetaLabel';

/* Styles */
import styles from './index.module.scss';

/* Constants */
import { getActiveIndex } from '../../../constants/AdminLayout';

/* Types */
import { NavbarBarOption } from '../../../interfaces/Admin';

/* Images */
import NavDownArrow from '../../../assets/images/navDownArrow.svg';

interface Props {
  currentPath: string;
  setCurrentPath: (path: string) => void;
  option: NavbarBarOption;
  optionIndex: number;
  expandedIndex: number;
  setExpandedIndex: (e: any, index: any) => void;
  mainOptionClassName: string;
  subOptionClassName: string;
}

const SidebarDropdown = (props: Props) => {
  const {
    currentPath,
    setCurrentPath,
    option,
    optionIndex,
    setExpandedIndex,
    expandedIndex,
    mainOptionClassName,
    subOptionClassName,
  } = props;
  const isMainOptionActive = getActiveIndex(currentPath) === optionIndex;

  const handleLinkClick = (e: any, subOption: NavbarBarOption) => {
    if (subOption.disabled) {
      e.preventDefault();
    } else {
      setCurrentPath(subOption.path);
    }
  };

  /* If nav has no sub options */
  if (!option.subOptions || option.subOptions.length === 0) {
    return (
      <Link
        to={option.path}
        onClick={(e: any) => {
          handleLinkClick(e, option);
        }}
        className={option.disabled ? styles.disabled : ''}
        style={{ textDecoration: 'none' }}
      >
        <div
          className={`${styles.mainOption} 
                        ${mainOptionClassName} 
                        ${isMainOptionActive ? styles.active : ''}
                        ${option.disabled ? styles.disabled : ''}
                    `}
        >
          <div className={styles.navIcon}>
            {option.isBeta && <BetaLabel isNav />}
            <img src={option.icon} alt="nav-icon" />
          </div>
          <p className={styles.navLabel}>{option.label}</p>
        </div>
      </Link>
    );
  }
  return (
    <React.Fragment>
      {/* Main Nav Option */}
      <Accordion.Title
        active={!option.disabled && expandedIndex === optionIndex}
        index={optionIndex}
        onClick={!option.disabled ? setExpandedIndex : () => null}
        className={
          option.disabled
            ? `${styles.disabled} ${styles.accordionContent}`
            : styles.accordionContent
        }
      >
        <div
          className={`${styles.mainOption} 
                ${mainOptionClassName} 
                ${isMainOptionActive ? styles.active : ''}`}
        >
          <div className={styles.navIcon}>
            {option.isBeta && <BetaLabel isNav />}
            <img src={option.icon} alt="nav-icon" />
          </div>
          <p className={styles.navLabel}>{option.label}</p>
          <img src={NavDownArrow} alt="down-arrow" className={styles.downArrow} />
        </div>
      </Accordion.Title>

      {/* Sub Nav Options */}
      <Accordion.Content
        active={!option.disabled && expandedIndex === optionIndex}
        className={`${styles.accordionContent}`}
      >
        <div className={`${subOptionClassName}`}>
          {option.subOptions &&
            option.subOptions.map((subOption: NavbarBarOption) => {
              return (
                <Link
                  key={subOption.label}
                  to={subOption.path}
                  onClick={(e: any) => handleLinkClick(e, subOption)}
                  className={subOption.disabled ? styles.disabled : ''}
                  style={{ textDecoration: 'none', fontWeight: 'lighter' }}
                >
                  <div
                    className={`
                                    ${styles.subOption}
                                    ${currentPath === subOption.path ? styles.active : ''}
                                    ${subOption.disabled ? styles.disabled : ''}
                                `}
                  >
                    <div className={styles.navIcon}>
                      {subOption.isBeta && <BetaLabel isNav />}
                      <img src={option.icon} alt="nav-icon" />
                    </div>
                    <div className={styles.subOptionText}>
                      <p className={styles.label}>{subOption.label}</p>
                      <p className={styles.desc}>{subOption.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </Accordion.Content>
    </React.Fragment>
  );
};
export default SidebarDropdown;
