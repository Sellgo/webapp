import React from 'react';

/* Styling */
import styles from './index.module.scss';
import { AppConfig } from '../../../../config';

const VideoSection = () => {
  const youtubeLink = AppConfig.ONBOARDING_VIDEO;
  return (
    <>
      <section className={styles.videoSection}>
        <h2>Thanks for your patience of waiting for the migration.</h2>
        <p>
          Say goodbye to missing out on growth, profits and healthy cash flow because of manual and
          outdated supply chain. We will streamline and automate what is often the most stressful,
          time consuming and costly process of your Amazon business.
        </p>
        {youtubeLink && (
          <div className={styles.borderWrapper}>
            <div className={styles.youtubeEmbedContainer}>
              <iframe
                title="SellGo Demo Video"
                width="860"
                height="500"
                src={'https://www.youtube.com/embed/QmRUTeP6J-I'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; 
                  encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default VideoSection;
