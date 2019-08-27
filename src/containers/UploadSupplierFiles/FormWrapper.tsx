import React, { useState } from 'react';
import { Form, TextArea, Icon, Grid, Modal } from 'semantic-ui-react';
import { reduxForm } from 'redux-form';
import get from 'lodash/get';
import { connect } from 'react-redux';

const FormWrapper = (props: any) => {
  return props.children;
};

const mapStateToProps = (state: {}) => ({
  initialValues: get(state, 'modals.uploadSupplier.meta', {}),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'supplier-info',
    onSubmit: () => {},
  })(FormWrapper)
);
