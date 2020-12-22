import React, { useEffect } from 'react';
import { Icon, Loader, Menu, Popup } from 'semantic-ui-react';
import './index.scss';
import { fetchActiveExportFiles, setFileDownloaded } from '../../actions/Products';
import { connect } from 'react-redux';
import { activeExportFiles, isFetchingActiveExports } from '../../selectors/Products';
import BELL_IMAGE from '../../assets/images/bell.svg';
import CSV_IMAGE from '../../assets/images/Group 3622.svg';
import XLSX_IMAGE from '../../assets/images/Group 3622 (1).svg';

import PROGRESSING from '../../assets/images/sellgo-loading-animation-450-1.gif';
import moment from 'moment';

interface Props {
  activeExportFiles: FileExport[];
  fetchActiveExportFiles: (isLoading: boolean) => void;
  fetchingActiveExports: boolean;
  setFileDownloaded: (payload: any) => void;
}

interface FileExport {
  id: number;
  seller_id: number;
  supplier_id: number;
  file: string;
  path: string;
  report_path: string;
  report_path_filtered: string;
  export_status: string;
  report_url_filtered: string;
  udate: string;
  is_downloaded: boolean;
}

const Notifications = (props: Props) => {
  const { activeExportFiles, fetchActiveExportFiles, fetchingActiveExports } = props;
  const processingCount = activeExportFiles.filter((file: FileExport) => !file.is_downloaded)
    .length;

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
      image = PROGRESSING;
    }

    return image;
  };

  const updateCount = async (payload: any) => {
    const { setFileDownloaded } = props;
    await setFileDownloaded(payload);
    await fetchActiveExportFiles(false);
  };

  useEffect(() => {
    fetchActiveExportFiles(true);
  }, []);
  return (
    <Popup
      content={
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
                      {getFileName(file.report_path)}
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
      }
      on="click"
      className="notifications"
      basic
      trigger={
        <Menu.Item onClick={() => fetchActiveExportFiles(true)}>
          <img src={BELL_IMAGE} className="bell-icon" />
          {!!processingCount && (
            <span onClick={() => fetchActiveExportFiles(true)} className="badge-count">
              {processingCount}
            </span>
          )}
        </Menu.Item>
      }
    />
  );
};
const mapStateToProps = (state: {}) => ({
  activeExportFiles: activeExportFiles(state),
  fetchingActiveExports: isFetchingActiveExports(state),
});

const mapDispatchToProps = {
  fetchActiveExportFiles: (isLoading: boolean) => fetchActiveExportFiles(isLoading),
  setFileDownloaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
