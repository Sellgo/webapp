import head from 'lodash/head';
import FileUploader from '../../../components/FileUploader';
import { connect } from 'react-redux';
import { prepareFile, handleRejectedFile } from '../../../actions/UploadSupplier';
import { fileDetailsSelector } from '../../../selectors/UploadSupplier';
import { extensions } from '../../../utils/file';

export const acceptedFileFormats = extensions;

const mapStateToProps = (state: {}) => ({
  accept: acceptedFileFormats,
  fileDetails: fileDetailsSelector(state),
});

const mapDispatchToProps = {
  onDrop: (acceptedFiles: File[]) => prepareFile(head(acceptedFiles)),
  onDropRejected: (rejectedFiles: File[]) => handleRejectedFile(head(rejectedFiles)),
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);
