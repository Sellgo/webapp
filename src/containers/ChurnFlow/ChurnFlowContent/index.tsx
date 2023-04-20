import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import OrangeButton from '../../../components/OrangeButton';

interface Props {
  onClick: () => any;
  title: string;
  desc: string;
  buttonText: string;
  img: string;
  isButtonGrey?: boolean;
}

const ChurnFlowContent = (props: Props) => {
  const { title, desc, buttonText, onClick, img, isButtonGrey } = props;
  const buttonType = isButtonGrey ? 'grey' : 'primary';

  return (
    <div className={styles.churnFlowContent}>
      <img className={styles.churnFlowContent__img} src={img} />
      <h2 className={styles.churnFlowContent__title}>{title}</h2>
      <p className={styles.churnFlowContent__desc}>{desc}</p>

      <OrangeButton type={buttonType} size="medium" onClick={onClick}>
        {buttonText}
      </OrangeButton>
    </div>
  );
};

export default ChurnFlowContent;
