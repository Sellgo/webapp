import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon } from 'semantic-ui-react';
import styles from './FileUploader.module.css';
import { MAX_FILE_SIZE_BYTES } from '../../constants/UploadSupplier';

interface FileUploaderProps {
  onDrop: (acceptedFiles: File[]) => void;
  onDropRejected: (rejectedFiles: File[]) => void;
  accept: string[];
  fileDetails: any;
}
function FileUploader(props: FileUploaderProps) {
  const { accept, onDrop, onDropRejected, fileDetails } = props;
  const multiple = false;

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    accept,
    multiple,
    maxSize: MAX_FILE_SIZE_BYTES,
  });

  // cloud download
  return (
    <button {...getRootProps()} className={`file-uploader ${styles.container}`} tabIndex={-1}>
      <input {...getInputProps()} />
      <Icon name="cloud upload" size="huge" className={styles.cloud} />
      <br />
      <p className={`description-container ${styles.description} ${styles['margin-top']}`}>
        <b className="upload-supplier-title">Upload filled-in Supplier File(s) here</b>
        <br />
        <span className={`upload-supplier-desc ${styles.description}`}>
          Drag and drop, or click to select
        </span>
        <br />
        <span className={`upload-supplier-desc ${styles.description}`}>
          Accepted File Types: {accept.join(', ')}
        </span>
        <br />
        <br />
        <b className={styles.filename}>{fileDetails !== null ? fileDetails.name : ' '}</b>
      </p>
    </button>
  );
}

export default FileUploader;
