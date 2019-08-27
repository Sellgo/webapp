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
                paddingBottom: 0,
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon
                name="cloud upload"
                color={!!this.props.file.name ? 'blue' : 'grey'}
                size="massive"
              />
              <br />
              {!!this.props.file ? (
                <p>File Selected: {this.props.file.name}</p>
              ) : (
                <div>
                  <h4>Upload filled-in Supplier File(s) here</h4>
                  <p>Drag and drop, or click to select</p>
                </div>
              )}
            </div>
          )}
        </Dropzone>
      </React.Fragment>
    );
  }
}
