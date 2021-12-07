import React from 'react';
// import { connect } from 'react-redux';

/* Styles */
// import styles from './index.module.scss';

import SalesEstimationMeta from './SalesEstimationMeta';
import SalesEstimationTable from './SalesEstimationTable';

// interface Props {}

const SalesEstimation = () => {
  return (
    <main>
      <SalesEstimationMeta />
      <SalesEstimationTable />
    </main>
  );
};

// const mapStateToProps = (state: any) => {
//   return {};
// };

// export default connect(mapStateToProps)(SalesEstimation);
export default SalesEstimation;
