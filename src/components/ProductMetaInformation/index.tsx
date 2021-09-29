import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import OnboardingButton from '../OnboardingButton';

interface PInfo {
  name: string;
  desc: string;
}

interface Props {
  informationDetails: PInfo[];
  showTutorialOnboarding: boolean;
  onboardingDisplayText: string;
  onboardingYoutubeLink: string;
  selectedIndex: number;
  isNewTutorial: boolean;
}

const ProductMetaInformation = (props: Props) => {
  const {
    selectedIndex,
    informationDetails,
    showTutorialOnboarding,
    onboardingYoutubeLink,
    onboardingDisplayText,
    isNewTutorial,
  } = props;

  const { name, desc } = informationDetails[selectedIndex];

  return (
    <section className={styles.productMetaInformation}>
      <h1>
        {name.toUpperCase()}: {desc}
      </h1>

      {showTutorialOnboarding && (
        <OnboardingButton
          displayMessage={onboardingDisplayText}
          youtubeLink={onboardingYoutubeLink}
          isNew={isNewTutorial}
        />
      )}
    </section>
  );
};

export default ProductMetaInformation;
