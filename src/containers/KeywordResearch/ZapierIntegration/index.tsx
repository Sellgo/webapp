import React from 'react';
import { connect } from 'react-redux';

/* Actions */
import { getSellerInfo } from '../../../actions/Settings';

/* Components */
import Trigger from './Trigger';
import ZapierMeta from './ZapierMeta';

const Zapier = () => {
  return (
    <>
      <ZapierMeta />
      <Trigger />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  profile: state.settings.profile,
});

const mapDispatchToProps = {
  getSeller: () => getSellerInfo(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Zapier);
