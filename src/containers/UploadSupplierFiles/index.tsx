import React from 'react';
import { Segment, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import AdminLayout from '../../components/AdminLayout';
import UploadSteps from './UploadSteps';

interface Props {
  match: any;
  sellerData: any;
}

const steps = [
  {
    title: 'Add New Supplier',
  },
  {
    title: 'Select File',
  },
  {
    title: 'Data Mapping',
  },
  {
    title: 'Data Validation',
  },
];

export const UploadSupplierFiles = (props: Props) => {
  return (
    <AdminLayout
      auth={props.match.params.auth}
      sellerData={props.sellerData}
      title={'Upload Supplier Files'}
    >
      <Segment>
        <UploadSteps />
        <Container>test</Container>
      </Segment>
    </AdminLayout>
  );
};

const mapStateToProps = (state: any) => ({
  sellerData: state.settings.profile,
});

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadSupplierFiles);
