import React from 'react';
import { v4 as uuid } from 'uuid';
import { Modal } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import PricingPlansCardFeaturesList from '../PricingPlansCard/PricingPlansCardFeaturesList';
import DemoForm from '../DemoForm';

interface Props {
  title: string;
  subtitle: string;
  planName: string;
  featuresList: any[];
}

const BuyPlanPriceCard: React.FC<Props> = props => {
  const { title, subtitle, planName, featuresList } = props;
  const [isDemoFormOpen, setIsDemoFormOpen] = React.useState(false);

  return (
    <div className={styles.buyPlanCard}>
      <h2 className={styles.title}> {title} </h2>

      <p className={styles.subtitle}>{subtitle}</p>

      <button className={styles.priceCardCTA} onClick={() => setIsDemoFormOpen(true)}>
        We&apos;d be happy to talk!
      </button>
      <p className={styles.planName}>{planName}</p>
      <div className={styles.pricingPlansCardBody}>
        {featuresList.map((featureList: any) => {
          return <PricingPlansCardFeaturesList key={uuid()} {...featureList} />;
        })}
      </div>
      <Modal
        open={isDemoFormOpen}
        onClose={() => setIsDemoFormOpen(false)}
        // className={styles.demoModal}
      >
        <DemoForm onRequestClose={() => setIsDemoFormOpen(false)} />
      </Modal>
    </div>
  );
};

export default BuyPlanPriceCard;
