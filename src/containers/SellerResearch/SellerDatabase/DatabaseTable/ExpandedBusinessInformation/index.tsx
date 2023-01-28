import React from 'react';

// Styles
import styles from './index.module.scss';

// Components
import BusinessInformation from './BusinessInformation';
import EmployeesInformation from './EmployeeInformation';

interface Props {
  rowData?: any;
}
const ExpandedBusinessInformation = (props: Props) => {
  const { rowData } = props;

  return (
    <section className={styles.merchantDetails}>
      {/* Businnes informatiob */}
      <BusinessInformation rowData={rowData} className={styles.businessInformation} />
      {/* Employee information */}
      <EmployeesInformation rowData={rowData} className={styles.employeeInformation} />
    </section>
  );
};

export default ExpandedBusinessInformation;
