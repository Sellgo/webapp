import React from 'react';
import { Loader, Menu, Popup } from 'semantic-ui-react';
import './index.scss';
import { fetchActiveExportFiles } from '../../actions/Products';
import { connect } from 'react-redux';
import { activeExportFiles, isFetchingActiveExports } from '../../selectors/Products';
import BELL_IMAGE from '../../assets/images/bell.svg';
import CSV_IMAGE from '../../assets/images/Group 3622.svg';
import XLSX_IMAGE from '../../assets/images/Group 3622 (1).svg';

import PROGRESSING from '../../assets/images/sellgo-loading-animation-450-1.gif';
import moment from 'moment';

interface Props {
  activeExportFiles: FileExport[];
  fetchActiveExportFiles: () => void;
  fetchingActiveExports: boolean;
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
}

const Notifications = (props: Props) => {
  const { activeExportFiles, fetchActiveExportFiles, fetchingActiveExports } = props;
  const processingCount = activeExportFiles.filter(
    (file: FileExport) => file.export_status === 'processing'
  ).length;
  const getFileImage = (file: string) => {
    const fileName = file ? file : '';
    const ext = fileName.split('.').pop();
    return ext === 'csv' ? CSV_IMAGE : XLSX_IMAGE;
  };

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
              <a key={file.id} href={file.report_url_filtered}>
                <div className="notification">
                  <div>
                    <img
                      src={
                        file.export_status !== 'completed'
                          ? PROGRESSING
                          : getFileImage(file.report_path_filtered)
                      }
                      className="file-image progressing"
                    />
                  </div>
                  <div>
                    <p
                      className={`${
                        file.export_status === 'completed' ? 'file-name' : 'in-progress-file'
                      }`}
                    >
                      {file.report_path_filtered.split('/').pop()}
                    </p>
                    {file.export_status !== 'completed' && (
                      <p className="file-status">Export in progress: might take a few mins...</p>
                    )}

                    {file.export_status === 'completed' && (
                      <p className="file-status">
                        {moment(file.udate).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                      </p>
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
        <Menu.Item onClick={() => fetchActiveExportFiles()}>
          <img src={BELL_IMAGE} className="bell-icon" />
          {!!processingCount && (
            <span onClick={() => fetchActiveExportFiles()} className="badge-count">
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
  fetchActiveExportFiles,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
