import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon } from 'semantic-ui-react';
import styles from './FileUploader.module.css';

interface FileUploaderProps {
  onDrop: (acceptedFiles: File[]) => void;
  accept: string[];
  fileName: any;
}
function FileUploader(props: FileUploaderProps) {
  const { accept, onDrop, fileName } = props;
  const multiple = false;

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  // cloud download
  return (
    <button {...getRootProps()} className={`file-uploader ${styles.container}`} tabIndex={-1}>
      <input {...getInputProps()} />
      <Icon name="cloud upload" size="huge" className={styles.cloud} />
      <br />
      <p className={`description-container ${styles.description} ${styles['margin-top']}`}>
        <b className="upload-supplier-csv">Upload filled-in Supplier File(s) here</b>
        <br />
        <span className={`upload-supplier-desc ${styles.description}`}>
          Drag and drop, or click to select
        </span>
        <br />
        <br />
        <b className={styles.filename}>
          {fileName !== null ? fileName.name : ' '}
          {/*   {acceptedFiles.length > 0 &&
            acceptedFiles.map(acceptedFile => <li key={acceptedFile.name}>{acceptedFile.name}</li>)} */}
        </b>
      </p>
    </button>
  );
}

export default FileUploader;
