import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  heading: string;
  body: string;
  ending: string;
}

const FormSubmitConfirm: React.FC<Props> = props => {
  const { heading, body, ending } = props;

  return (
    <div className={styles.formSubmitConfirm}>
      <h1>{heading}</h1>
      <div>
        <p>Welcome to the AiStock community.</p>
        <p>{body}</p>
      </div>

      <div>
        <small>Thank you for your request.</small>
        <small>{ending}</small>
      </div>
    </div>
  );
};

export default FormSubmitConfirm;
