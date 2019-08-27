import * as React from 'react';
import { CsvToHtmlTable } from 'react-csv-to-table';
import { Grid, Dropdown, Segment } from 'semantic-ui-react';

interface State {
  data: string;
}

export default class SupplierModalPage3 extends React.Component<any, State> {
  state: State = {
    data: '',
  };

  headerOptions: any = [
    {
      key: '0',
      text: 'A',
      value: '1',
    },
    {
      key: '1',
      text: 'B',
      value: '2',
    },
    {
      key: '2',
      text: 'C',
      value: '3',
    },
    {
      key: '3',
      text: 'D',
      value: '4',
    },
    {
      key: '4',
      text: 'E',
      value: '5',
    },
  ];

  render() {
    return (
      <React.Fragment>
        <Segment>
          <div className="supplierModalPage3" style={{ minHeight: '40vh' }}>
            {/* <Header as="h2">File: {this.props.file.name}</Header> */}
            <Grid columns={4}>
              <Grid.Column>
                <Grid.Row>
                  <h4>UPC/EAN/ASIN</h4>
                </Grid.Row>
                <Dropdown
                  name="upc"
                  className={'supplyColumnDropDown'}
                  selectOnBlur={false}
                  fluid={true}
                  selection={true}
                  options={this.headerOptions}
                  onChange={this.props.onChangeColumnHeaderKey}
                  value={this.props.upc}
                />
              </Grid.Column>
              <Grid.Column>
                <Grid.Row>
                  <h4>COST</h4>
                </Grid.Row>
                <Dropdown
                  name="cost"
                  className={'supplyColumnDropDown'}
                  selectOnBlur={false}
                  fluid={true}
                  selection={true}
                  options={this.headerOptions}
                  onChange={this.props.onChangeColumnHeaderKey}
                  value={this.props.cost}
                />
              </Grid.Column>
              <Grid.Column>
                <Grid.Row>
                  <h4>SKU</h4>
                </Grid.Row>
                <Dropdown
                  name="msrp"
                  className={'supplyColumnDropDown'}
                  selectOnBlur={false}
                  fluid={true}
                  selection={true}
                  options={this.headerOptions}
                  onChange={this.props.onChangeColumnHeaderKey}
                  value={this.props.msrp}
                />
              </Grid.Column>
              <Grid.Column>
                <Grid.Row>
                  <h4>TITLE</h4>
                </Grid.Row>
                <Dropdown
                  name="title"
                  className={'supplyColumnDropDown'}
                  selectOnBlur={false}
                  fluid={true}
                  selection={true}
                  options={this.headerOptions}
                  onChange={this.props.onChangeColumnHeaderKey}
                  value={this.props.title}
                />
              </Grid.Column>
            </Grid>
            <Segment style={{ marginTop: 0 }} color="yellow">
              This is just a preview of your table for mapping the proper columns
            </Segment>
            <CsvToHtmlTable
              tableClassName={'ui celled table'}
              data={this.props.shortSupplyData}
              csvDelimiter=","
            />
          </div>
        </Segment>
      </React.Fragment>
    );
  }
}
