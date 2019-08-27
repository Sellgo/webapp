import * as React from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'semantic-ui-react';

export default class SupplierModalPage2 extends React.Component<any, {}> {
  render() {
    return (
      <React.Fragment>
        <Dropzone accept=".csv" onDrop={this.props.onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                minHeight: '40vh',
                backgroundColor: '#EEEEEE',
                borderRadius: '24px',
                border: '2px dashed grey',
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon name="cloud upload" color={'grey'} size="huge" />
              <br />
              {!!this.props.file ? (
                <p>File Selected: {this.props.file.name}</p>
              ) : (
                <p>Drag & drop your CSV file here, or click to select the file </p>
              )}
            </div>
          )}
        </Dropzone>
      </React.Fragment>
    );
  }
}
