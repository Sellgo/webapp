import React, { useState } from 'react';

// Styles
import styles from './index.module.scss';

// Components
import BusinessInformation from './BusinessInformation';
import EmployeesInformation from './EmployeeInformation';
import GraphicalInformation from './GraphicalInformation';

interface Props {
  rowData?: any;
}
const ExpandedBusinessInformation = (props: Props) => {
  const { rowData } = props;
  const [currentTab, setCurrentTab] = useState<number>(0);

  return (
    <section className={styles.merchantDetails}>
      {/* Businnes informatiob */}
      <BusinessInformation rowData={rowData} className={styles.businessInformation} />
      {/* Graphical Information */}
      <div className={styles.specificDetails}>
        <div className={styles.tabs}>
          <p onClick={() => setCurrentTab(0)}>Decision Makers</p>
          <p onClick={() => setCurrentTab(1)}>Brands</p>
          <p onClick={() => setCurrentTab(2)}>Revenue</p>
          <p onClick={() => setCurrentTab(3)}>Reviews</p>
        </div>
        {/* Employee information */}
        {currentTab === 0 && (
          <EmployeesInformation rowData={rowData} className={styles.employeeInformation} />
        )}
        {currentTab === 1 && (
          <GraphicalInformation rowData={rowData} className={styles.graphicalInformation} />
        )}
      </div>
    </section>
  );
};

export default ExpandedBusinessInformation;
