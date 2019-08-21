import React, { useState } from 'react';
import { Form, TextArea, Icon, Grid, Modal } from 'semantic-ui-react';
import { reduxForm } from 'redux-form';

const FormWrapper = (props: any) => {
  return props.children;
};

export default reduxForm({
  form: 'supplier-info',
  onSubmit: () => {},
})(FormWrapper);
