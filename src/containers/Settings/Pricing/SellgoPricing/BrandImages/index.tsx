import React, { memo } from 'react';

import styles from './index.module.scss';

/* Constants */
import { BRANDS_DATA } from '../../../../../constants/Pricing/SellgoPricing/brands';

const BrandImages = () => {
  return (
    <section className={styles.brandImageSection}>
      <h2>These leading brands are growing their business with Sellgo</h2>
      <div>
        {BRANDS_DATA.map(BrandData => {
          const { brandName, img } = BrandData || {};
          return <img key={brandName} src={img} alt="brand picture" />;
        })}
      </div>
    </section>
  );
};

export default memo(BrandImages);
