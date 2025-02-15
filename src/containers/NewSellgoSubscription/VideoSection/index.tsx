import React from 'react';
import ActionButton from '../../../components/ActionButton';

/* Styling */
import styles from './index.module.scss';

interface Props {
  setIsModalOpen: (isOpen: boolean) => void;
}

const SellgoGreetingVideoSection = (props: Props) => {
  return (
    <div className={styles.modal}>
      <section className={styles.videoSection}>
        <div className={styles.borderWrapper}>
          <div className={styles.youtubeEmbedContainer}>
            <iframe
              title="Aistock Demo Video"
              width="860"
              height="500"
              src={'https://www.youtube.com/embed/nzauq0GWoFk'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write;
                  encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <ActionButton
          type="grey"
          variant="primary"
          size="md"
          onClick={() => {
            props.setIsModalOpen(false);
            window.localStorage.setItem('skippedSellgoGreetingVideo', 'true');
          }}
          className={styles.button}
        >
          Skip video
        </ActionButton>
      </section>
    </div>
  );
};

export default SellgoGreetingVideoSection;
