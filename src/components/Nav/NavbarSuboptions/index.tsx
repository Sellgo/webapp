import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Transition, Menu } from 'semantic-ui-react'
import NavIcon from '../../Icons/NavIcon';
import styles from './index.module.scss';
import { getActiveIndex } from '../../../constants/AdminLayout';


interface Props {
    currentPath: string;
    setCurrentPath: (path: string) => void;
    option: any;
    optionIndex: number;
    expandedIndex: number;
    setExpandedIndex: (e:any, index:any) => void;
    mainOptionClassName: string;
    subOptionClassName: string;   
}

const NavbarDropdown = (props:Props) => {
    const {currentPath, setCurrentPath, option, optionIndex, setExpandedIndex, expandedIndex, mainOptionClassName, subOptionClassName} = props;
    const isMainOptionActive = getActiveIndex(currentPath) === optionIndex;
    return (
        <React.Fragment>
            {/* Main Nav Option */}
            <Accordion.Title
                active={!option.disabled && expandedIndex === optionIndex}
                index={optionIndex}
                onClick={!option.disabled ? setExpandedIndex : () => null}
                className={styles.accordionContent}
            >
            <div 
                className={`${styles.mainOption} 
                ${mainOptionClassName} 
                ${isMainOptionActive ? styles.active : ''}`}
            >
                <div className={styles.navIcon}>
                    <NavIcon iconName={option.icon}/>
                </div>
                <p className={styles.navLabel}>{option.label}</p>
            </div>
            </Accordion.Title>

            {/* Sub Nav Options */}
            <Accordion.Content 
                active={!option.disabled && expandedIndex === optionIndex} 
                className={`${styles.accordionContent}`}
            >
                    <div className={`${subOptionClassName}`}>
                        {option.subOptions.map((subOption:any) => {
                            return (
                                <Menu.Item 
                                    link 
                                    active 
                                    to={subOption.path} 
                                    as ={Link} 
                                    onClick={() => {
                                        setCurrentPath(subOption.path)
                                    }}
                                    disabled={subOption.disabled}
                                >
                                <div className={`${styles.subOption} ${currentPath === subOption.path ? styles.active : ''}`}>
                                    <div className={styles.navIcon}>
                                        <NavIcon iconName={subOption.icon}/>
                                    </div>
                                    <div className={styles.navSubOptionText}>
                                        <p className={styles.label}>{subOption.label}</p>
                                        <p className={styles.desc}>{subOption.description}</p>
                                    </div>

                                </div>
                                </Menu.Item>)
                        })}
                    </div>
            </Accordion.Content>

        </React.Fragment>
    )
}
export default NavbarDropdown;
