import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Transition, Menu } from 'semantic-ui-react'
import NavIcon from '../../Icons/NavIcon';
import styles from './index.module.scss';


interface Props {
    currentPage: string;
    activeIndex: number;
    option: any;
    optionIndex: number;
    onSetIndex: (e:any, index:any) => void;
    mainOptionClassName: string;
    subOptionClassName: string;
    
}
const NavbarDropdown = (props:Props) => {
    
    const {currentPage, option, optionIndex, onSetIndex, activeIndex, mainOptionClassName, subOptionClassName} = props;
    const isActive = currentPage === (option.path);

    return (
        <React.Fragment>
            <Accordion.Title
                active={activeIndex === optionIndex}
                index={optionIndex}
                onClick={onSetIndex}
                className={styles.accordionContent}
            >
            <div className={`${styles.mainOption} ${mainOptionClassName} ${isActive ? styles.active : ''}`}>
                <div className={styles.navIcon}>
                    <NavIcon iconName={option.icon}/>
                </div>
                <p className={styles.navLabel}>{option.label}</p>
            </div>
            </Accordion.Title>
            <Accordion.Content 
                active={activeIndex === optionIndex} 
                className={`${styles.accordionContent}`}
            >
                    <div className={`${subOptionClassName}`}>
                        {option.subOptions.map((subOption:any) => {
                            console.log(subOption.path);
                            return (
                                <Menu.Item link active to={subOption.path} as ={Link}>
                                <div className={styles.subOption}>
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
