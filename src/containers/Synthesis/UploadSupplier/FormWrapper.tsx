import { reduxForm } from 'redux-form';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { marketPlace } from '../../../constants/UploadSupplier';

const FormWrapper = (props: any) => {
  return props.children;
};

const mapStateToProps = (state: {}) => ({
  initialValues: get(state, 'modals.uploadSupplier.meta', {
    marketplace_id: marketPlace[0].value,
  }),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'supplier-info',
    onSubmit: () => {
      //do nothing
    },
  })(FormWrapper)
);
