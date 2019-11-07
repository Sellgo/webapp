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

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(
//   reduxForm({
//     form: 'supplier-info',
//     onSubmit: () => {},
//   })(FormWrapper)
// );

export default reduxForm({
  form: 'supplier-info',
  onSubmit: () => {},
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FormWrapper)
);
