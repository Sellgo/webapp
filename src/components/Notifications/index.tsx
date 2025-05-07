import React, { useEffect } from 'react';
import { Icon, Loader } from 'semantic-ui-react';
import './index.scss';
import { fetchActiveExportFiles, setFileDownloaded } from '../../actions/Products';
import { connect } from 'react-redux';
import { activeExportFiles, isFetchingActiveExports } from '../../selectors/Products';

import CSV_IMAGE from '../../assets/images/Group 3622.svg';
import XLSX_IMAGE from '../../assets/images/Group 3622 (1).svg';

import SELLGO_PROGRESSING from '../../assets/images/sellgo-loading-animation-450-1.gif';
import AISTOCK_PROGRESSING from '../../assets/images/sellgo-loading-animation-450-1.gif';
import { isSellgoSession } from '../../utils/session';
import moment from 'moment';
import { selectIsNotificationOpen } from '../../selectors/Notification';
import { toggleNotification } from '../../actions/Notification';
import { FileExport } from '../../interfaces/FileExport';

interface Props {
  activeExportFiles: FileExport[];
  fetchActiveExportFiles: (isLoading: boolean) => void;
  fetchingActiveExports: boolean;
  setFileDownloaded: (payload: any) => void;
  isNotificationOpen: boolean;
  toggleNotification: (toggleState: boolean) => void;
}

const Notifications = (props: Props) => {
  const { activeExportFiles, fetchActiveExportFiles, fetchingActiveExports, isNotificationOpen } =
    props;

  const getFileName = (file: string) => {
    let fileName: string | undefined = '';
    if (file) {
      fileName = file.split('/').pop();
    }
    return fileName;
  };

  const getFileImage = (file: string, status: string) => {
    const fileName = file ? file : '';
    let image = '';
    if (status === 'completed') {
      const ext = fileName.split('.').pop();
      image = ext === 'csv' ? CSV_IMAGE : XLSX_IMAGE;
    }

    if (status === 'processing') {
      image = isSellgoSession() ? SELLGO_PROGRESSING : AISTOCK_PROGRESSING;
    }

    return image;
  };

  const updateCount = async (payload: any) => {
    const { setFileDownloaded } = props;
    if (payload.export_status === 'completed') {
      await setFileDownloaded(payload);
      await fetchActiveExportFiles(false);
    }
  };

  useEffect(() => {
    fetchActiveExportFiles(true);
  }, [isNotificationOpen]);

  return (
    <>
      {isNotificationOpen && (
        <div className="notifications">
          <div>
            <div className="title">
              <p>Notifications</p>
            </div>
            <div>
              {fetchingActiveExports && (
                <React.Fragment>
                  <br />
                  <Loader active inline="centered" />
                </React.Fragment>
              )}
              {activeExportFiles.map((file: any) => (
                <a key={file.id} href={file.report_url_filtered} onClick={() => updateCount(file)}>
                  <div className="notification">
                    <div className="file-image-container">
                      {file.export_status !== 'failed' && (
                        <img
                          src={getFileImage(file.report_path_filtered, file.export_status)}
                          className="file-image progressing"
                        />
                      )}
                      {file.export_status === 'failed' && (
                        <Icon name={'ban'} size={'large'} className={'failed'} />
                      )}
                    </div>
                    <div>
                      <p
                        className={`${
                          file.export_status === 'completed' ? 'file-name' : 'in-progress-file'
                        } ${!file.is_downloaded ? 'downloaded' : ''}`}
                      >
                        {getFileName(file.report_path_filtered)}
                      </p>
                      {file.export_status === 'processing' && (
                        <p className="file-status">Export in progress: might take a few mins...</p>
                      )}

                      {file.export_status === 'completed' && (
                        <p className="file-status">
                          {moment(file.udate).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                        </p>
                      )}
                      {file.export_status === 'failed' && (
                        <p className="failed-text">Export Failed.</p>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
const mapStateToProps = (state: {}) => ({
  activeExportFiles: activeExportFiles(state),
  fetchingActiveExports: isFetchingActiveExports(state),
  isNotificationOpen: selectIsNotificationOpen(state),
});

const mapDispatchToProps = {
  fetchActiveExportFiles: (isLoading: boolean) => fetchActiveExportFiles(isLoading),
  setFileDownloaded,
  toggleNotification: (toggleState: boolean) => toggleNotification(toggleState),
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
