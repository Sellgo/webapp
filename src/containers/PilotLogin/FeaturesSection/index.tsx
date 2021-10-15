import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import { FEATURES } from './data';

const FeaturesSection = () => {
  return (
    <>
      <section className={styles.featuresSection}>
        <div className={styles.featuresGrid}>
          {FEATURES.map((feature: any) => {
            return (
              <div key={feature.name}>
                <h3 className={styles.featureTitle}>
                  <img src={feature.icon} alt={`${feature.name}`} />
                  {feature.title}
                </h3>
                <p className={styles.featureSubtitle}>{feature.subtitle}</p>
                <p className={styles.featureContent}>{feature.content}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;
