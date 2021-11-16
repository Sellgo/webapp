import React from 'react';
import { connect } from 'react-redux';

/* Actions */

/* Styling */
// import styles from './index.module.scss';

/* Components */

/* Constants */

const Rule = () => {
  return (
    <>
      <h1> META </h1>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  profile: state.settings.profile,
});

const mapDispatchToProps = {
  // getSeller: () => getSellerInfo(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Rule);
