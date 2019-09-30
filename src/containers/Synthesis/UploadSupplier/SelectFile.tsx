import head from 'lodash/head';
import FileUploader from '../../../components/FileUploader';
import { connect } from 'react-redux';
import { prepareCsv } from '../../../actions/UploadSupplier';
import { csvFileSelector } from '../../../selectors/UploadSupplier';

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
