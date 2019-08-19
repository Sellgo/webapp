import React from 'react';
import { useDropzone } from 'react-dropzone';

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
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

export default FileUploader;
