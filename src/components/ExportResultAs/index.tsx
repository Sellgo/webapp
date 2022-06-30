import React, { SyntheticEvent, useEffect } from 'react';
import { Button, Modal, Select } from 'semantic-ui-react';
import DOWNLOAD_IMAGE from '../../assets/images/download-solid.svg';
import './index.scss';
interface Props {
  open: boolean;
  formats: any[];
  data: any[];
  onExport?: (value: any) => void;
  url?: string;
  onClose: () => void;
  loading?: boolean;
  format?: string;
  onFormatChange?: (format: string) => void;
}

const ExportResultAs = (props: Props) => {
  const { open, formats, data, onExport, url, onClose, loading, format, onFormatChange } = props;

  const [exportFormat, setExportFormat] = React.useState(format);
  const [exportData, setExportData] = React.useState('all');

  useEffect(() => {
    setExportFormat(format);
  }, [format]);

  const handleExport = () => {
    if (onExport) {
      onExport({
        format: exportFormat,
        data: exportData,
      });
    }

    if (url) {
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <Modal
      onClose={onClose}
      content={
        <div>
          <p>
            <img src={DOWNLOAD_IMAGE} /> Export file as
          </p>
          <p className="export-format">File format</p>
          <Select
            placeholder="Select File Format"
            options={formats}
            className="export-input"
            value={exportFormat}
            onChange={(event: SyntheticEvent, selected: any) => {
              event.stopPropagation();
              setExportFormat(selected.value);
              if (onFormatChange) {
                onFormatChange(selected.value);
              }
            }}
          />
          <p className="export-data">Data</p>
          <Select
            placeholder="Select Data to Export"
            options={data}
            value={exportData}
            className="export-input"
            onChange={(event: SyntheticEvent, selected: any) => {
              event.stopPropagation();
              setExportData(selected.value);
            }}
          />
          <div className="export-btn">
            <Button loading={loading} content="Export" basic onClick={handleExport} />
          </div>
        </div>
      }
      on="click"
      open={open}
      className="export-result-as"
    />
  );
};

export default ExportResultAs;
