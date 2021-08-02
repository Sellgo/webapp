import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* COntainers */
import MapFilters from './MapFilters';

const MapPanel = () => {
  return (
    <>
      <section className={styles.filterSection}>
        <MapFilters />
      </section>

      <section className={styles.mapContainer}>This is where will be</section>
    </>
  );
};

export default MapPanel;
