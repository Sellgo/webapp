import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon } from 'semantic-ui-react';
import styles from './FileUploader.module.css';

interface FileUploaderProps {
  onDrop: (acceptedFiles: File[]) => void;
  accept: string[];
}
function FileUploader(props: FileUploaderProps) {
  const { accept, onDrop } = props;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  // cloud download
  return (
    <button {...getRootProps()} className={styles.container} tabIndex={-1}>
      <input {...getInputProps()} />
      <Icon name="cloud upload" size="huge" className={styles.cloud} />
      <br />
      <p className={`${styles.description} ${styles.marginTop}`}>
        <b>Upload filled-in Supplier File(s) here</b>
        <br />
        <p className={styles.description}>Drag and drop, or click to select</p>
      </p>
    </button>
  );
}

export default FileUploader;
