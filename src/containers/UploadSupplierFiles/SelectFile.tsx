import React, { useCallback } from 'react';
import head from 'lodash/head';
import FileUploader from '../../components/FileUploader';
import { connect } from 'react-redux';
import { prepareCsv } from '../../Action/UploadSupplierFilesActions';

const acceptedFileFormats = ['.csv'];

const mapStateToProps = () => ({
  accept: acceptedFileFormats,
});

const mapDispatchToProps = {
  onDrop: (acceptedFiles: File[]) => prepareCsv(head(acceptedFiles)),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileUploader);
