import React from 'react';

/* Styling */
import styles from './index.module.scss';
import BoxHeader from '../../../../components/BoxHeader';
import BoxContainer from '../../../../components/BoxContainer';

const Overage = () => {
  return (
    <section className={styles.overageWrapper}>
      <BoxHeader>Payment Settings</BoxHeader>
      <BoxContainer>
        <div>
          <p className={styles.overage__text}>
            <span className={styles.overage__number}>100 - 300 </span> overage lookups{' '}
            <span className={styles.overage__cost}>$1.29</span> per lookups
          </p>

          <p className={styles.overage__text}>
            <span className={styles.overage__number}>301 - 1000</span> overage lookups{' '}
            <span className={styles.overage__cost}>$1.19</span> per lookups
          </p>

          <p className={styles.overage__text}>
            <span className={styles.overage__number}>1001 - 3000</span> overage lookups{' '}
            <span className={styles.overage__cost}>$0.99</span> per lookups
          </p>

          <p className={styles.overage__text}>
            <span className={styles.overage__number}>3001 - 6000</span> overage lookups{' '}
            <span className={styles.overage__cost}>$0.89</span> per lookups
          </p>

          <p className={styles.overage__text}>
            <span className={styles.overage__number}>{`> `}6000</span> overage lookups{' '}
            <span className={styles.overage__cost}>$0.79</span> per lookups
          </p>
        </div>
      </BoxContainer>
    </section>
  );
};
export default Overage;
