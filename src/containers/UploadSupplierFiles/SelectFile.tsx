import React, { useCallback } from 'react';
import head from 'lodash/head';
import FileUploader from '../../components/FileUploader';
import { connect } from 'react-redux';
import { prepareCsv } from '../../Action/UploadSupplierFilesActions';
import { csvFileSelector } from '../../selectors/UploadSupplierFiles';

const acceptedFileFormats = ['.csv'];

const mapStateToProps = (state: {}) => ({
  accept: acceptedFileFormats,
  fileName: csvFileSelector(state),
});

const mapDispatchToProps = {
  onDrop: (acceptedFiles: File[]) => prepareCsv(head(acceptedFiles)),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileUploader);
