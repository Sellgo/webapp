import head from 'lodash/head';
import FileUploader from '../../../components/FileUploader';
import { connect } from 'react-redux';
import { prepareFile, handleRejectedFile } from '../../../actions/UploadSupplier';
import { fileSelector } from '../../../selectors/UploadSupplier';

export const acceptedFileFormats = ['.csv', '.xls', '.xlsx'];

const mapStateToProps = (state: {}) => ({
  accept: acceptedFileFormats,
  fileName: fileSelector(state),
});

const mapDispatchToProps = {
  onDrop: (acceptedFiles: File[]) => prepareFile(head(acceptedFiles)),
  onDropRejected: (rejectedFiles: File[]) => handleRejectedFile(head(rejectedFiles)),
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);
