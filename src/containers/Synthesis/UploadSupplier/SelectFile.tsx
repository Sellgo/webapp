import head from 'lodash/head';
import FileUploader from '../../../components/FileUploader';
import { connect } from 'react-redux';
import { prepareCsv, handleRejectedFile } from '../../../actions/UploadSupplier';
import { csvFileSelector } from '../../../selectors/UploadSupplier';

const acceptedFileFormats = ['.csv'];

const mapStateToProps = (state: {}) => ({
  accept: acceptedFileFormats,
  fileName: csvFileSelector(state),
});

const mapDispatchToProps = {
  onDrop: (acceptedFiles: File[]) => prepareCsv(head(acceptedFiles)),
  onDropRejected: (rejectedFiles: File[]) => handleRejectedFile(head(rejectedFiles)),
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);
