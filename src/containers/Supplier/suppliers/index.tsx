import * as React from 'react';
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Table,
  Checkbox,
  Dropdown,
  Input,
  Icon,
  Popup,
  Modal,
  TextArea,
  Pagination,
  Loader,
  Confirm,
  List,
  Container,
  Card,
  Feed,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

import './suppliers.css';
import history from '../../../history';
import { Link } from 'react-router-dom';

import {
  getSellers,
  Supplier,
  saveSupplierNameAndDescription,
  updateSupplierNameAndDescription,
  resetUploadCSVResponse,
  uploadCSV,
  getTimeEfficiency,
  TimeEfficiency,
  deleteSupplier,
  postProductTrackGroupId,
  Product,
} from '../../../Action/SYNActions';
import Papa from 'papaparse';

import { getIsMWSAuthorized, getBasicInfoSeller } from '../../../Action/SettingActions';
import AdminLayout from '../../../components/AdminLayout';
import { SellField } from '../../../Action/SettingActions';
import { localStorageKeys } from '../../../constant/constant';
import { Modals } from '../../../components/Modals';
import MesssageComponent from '../../../components/MessageComponent';
import buttonStyle from '../../../components/StyleComponent/StyleComponent';
import Auth from '../../../components/Auth/Auth';
import SupplierModalPage1 from './supplierModal/SupplierModalPage1';
import SupplierModalPage2 from './supplierModal/SupplierModalPage2';
import SupplierModalPage3 from './supplierModal/SupplierModalPage3';
import SupplierModalPage4 from './supplierModal/SupplierModalPage4';
import SupplierModalState from './supplierModal/SupplierModalState';

interface State {
  terms: string;
  timezone: string;
  account_status: string;
  group: string;
  isKeepDataMapSetting: boolean;
  isSkipDataMapping: boolean;
  shortSupplyData: string;
  supplyData: any;
  supplierModalState: number;
  isMessageModalOn: boolean;
  isOpen: boolean;
  size: string;
  modalOpen: boolean;
  supplier_name: string;
  supplier_description: string;
  file: any;
  currentPage: any;
  totalPages: any;
  singlePageItemsCount: any;
  updateDetails: boolean;
  update_product_id: string;
  delete_confirmation: boolean;
  suppliers: Supplier[];
  delete_supplier_container: {
    contact: string;
    description: string;
    email: string;
    freight_fee: string;
    id: number;
    item_active_count: string;
    item_total_count: string;
    name: string;
    phone: string;
    rate: string;
    seller_id: number;
    status: string;
    supplier_group_id: 1;
    timezone: string;
    upcharge_fee: string;
    website: string;
    xid: string;
  };
  sortDirection: any;
  sortedColumn: string;
  supplyErrorMessages: any;
  upc: string;
  cost: string;
  title: string;
  msrp: string;
  supplierFormError: any;
}

interface Props {
  getSellers(): () => void;

  getBasicInfoSeller(): () => void;

  getTimeEfficiency(): () => void;

  resetUploadCSVResponse(): () => void;

  getIsMWSAuthorized(): () => void;

  postProductTrackGroupId(supplierID: string, supplierName: string): () => void;

  saveSupplierNameAndDescription(name: string, description: string, callBack: any): () => any;

  updateSupplierNameAndDescription(
    name: string,
    description: string,
    update_product_id: string,
    callBack: any
  ): () => any;

  deleteSupplier(supplier_id: any, callBack: any): () => any;

  uploadCSV(
    new_supplier_id: string,
    file: any,
    upc: string,
    cost: string,
    title: string,
    msrp: string
  ): () => void;

  match: { params: { auth: Auth } };
  suppliers: Supplier[];
  new_supplier: string;
  time_efficiency_data: TimeEfficiency[];
  sellerData: SellField;
  uploadCSVResponse: { message: ''; status: '' };
}

export class Suppliers extends React.Component<Props, State> {
  state: State = {
    terms: '',
    timezone: '',
    account_status: '',
    group: '',
    isSkipDataMapping: false,
    isKeepDataMapSetting: false,
    supplyData: [],
    shortSupplyData: '',
    supplierModalState: 1,
    suppliers: [],
    isOpen: false,
    size: '',
    modalOpen: false,
    supplier_name: '',
    supplier_description: '',
    file: '',
    totalPages: 5,
    currentPage: 1,
    singlePageItemsCount: 10,
    updateDetails: false,
    isMessageModalOn: false,
    update_product_id: '0',
    delete_confirmation: false,
    delete_supplier_container: {
      contact: '',
      description: '',
      email: '',
      freight_fee: '',
      id: 0,
      item_active_count: '',
      item_total_count: '',
      name: '',
      phone: '',
      rate: '',
      seller_id: 0,
      status: '',
      supplier_group_id: 1,
      timezone: '',
      upcharge_fee: '',
      website: '',
      xid: '',
    },
    sortDirection: undefined,
    sortedColumn: '',
    supplyErrorMessages: [],
    upc: '1',
    cost: '3',
    title: '2',
    msrp: '4',
    supplierFormError: {},
  };
  message = {
    id: 1,
    title: 'Information Updated',
    message: 'Thank you for Updating',
    description: 'You have successfully updated new information.',
    description2: '',
    to: '/dashboard/setting',
    button_text: 'Ok',
    icon: 'check circle',
    color: '#cf3105',
  };
  fileInputRef: any = React.createRef();

  componentDidMount() {
    this.props.getBasicInfoSeller();
    this.props.resetUploadCSVResponse();
    this.props.getIsMWSAuthorized();
    this.props.getSellers();
    this.props.getTimeEfficiency();
  }

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    if (
      nextProps.uploadCSVResponse.status !== this.props.uploadCSVResponse.status &&
      nextProps.uploadCSVResponse.status !== 'unset'
    ) {
      this.message.message = nextProps.uploadCSVResponse.message;
      this.message.description = ' ';
      this.message.description2 = '    ';
      this.message.to = '#';
      if (nextProps.uploadCSVResponse.status == 'failed') {
        this.message.title = 'Upload Failed';
        this.message.icon = 'warning sign';
        this.message.color = '#cf3105';
      } else {
        this.message.title = 'Upload Successful';
        this.message.icon = 'check circle';
        this.message.color = '#4285f4';
      }
      this.handleMessageModal();
    }

    this.setState({
      totalPages: Math.ceil(nextProps.suppliers.length / this.state.singlePageItemsCount),
      suppliers: nextProps.suppliers,
    });
  }

  componentDidUpdate(prevProps: any) {}

  fileChange = (event: any): void => {
    this.setState({ file: event.target.files[0] }, () => {});
  };

  public addNewSupplier = (): void => {
    if (this.state.updateDetails) {
      this.props.updateSupplierNameAndDescription(
        this.state.supplier_name,
        this.state.supplier_description,
        this.state.update_product_id,
        (data: any) => {
          this.props.getSellers();
          if (this.state.file != '') {
            this.props.uploadCSV(
              String(this.state.update_product_id),
              this.state.file,
              this.state.upc,
              this.state.cost,
              this.state.title,
              this.state.msrp
            );
            this.setState({ file: '' });
          }
          this.setState({ updateDetails: false });
          this.handleClose();
        }
      );
    } else {
      this.props.saveSupplierNameAndDescription(
        this.state.supplier_name,
        this.state.supplier_description,
        (data: any) => {
          this.props.postProductTrackGroupId(data.id, this.state.supplier_name);
          this.props.getSellers();
          console.log(this.props.new_supplier);
          if (this.props.new_supplier != null && this.state.file != '') {
            this.props.uploadCSV(
              String(this.props.new_supplier),
              this.state.file,
              this.state.upc,
              this.state.cost,
              this.state.title,
              this.state.msrp
            );
            this.setState({ file: '' });
          }

          this.handleClose();
        }
      );
    }
  };

  openUpdateSupplierPopup = (value: any): void => {
    if (localStorage.getItem(localStorageKeys.isMWSAuthorized) == 'true') {
      this.setState({
        modalOpen: true,
        update_product_id: value.id,
        updateDetails: true,
        supplier_name: value.name,
        supplier_description: value.description,
      });
    } else {
      this.message.title = 'Unauthorized Access';
      this.message.message = 'MWS Auth token not found';
      this.message.description = 'Please Setup MWS Authorization Token';
      this.message.to = '/dashboard/setting';
      this.message.icon = 'warning sign';
      this.message.color = '#cf3105';
      this.handleMessageModal();
    }
  };

  handleAddNewSupplierModalOpen = () => {
    if (localStorage.getItem(localStorageKeys.isMWSAuthorized) == 'true') {
      this.setState({
        supplier_name: '',
        supplier_description: '',
        modalOpen: true,
        updateDetails: false,
      });
    } else {
      this.message.title = 'Unauthorized Access';
      this.message.message = 'MWS Auth token not found';
      this.message.description = 'Please Setup MWS Authorization Token';
      this.message.to = '/dashboard/setting';
      this.message.icon = 'warning sign';
      this.message.color = '#cf3105';
      this.handleMessageModal();
    }
  };

  handleClose = () => this.setState({ modalOpen: false, updateDetails: false });

  resetUploadState = () => {
    this.setState({
      supplier_name: '',
      supplier_description: '',
      file: '',
      supplierModalState: 1,
      supplierFormError: {},
      supplyErrorMessages: [],
    });
  };

  nextModalState = () => {
    if (this.state.supplierModalState === 1 && this.state.supplier_name === '') {
      const newError = { supplier_name_error: 'No Supplier Name' };
      this.setState({ supplierFormError: newError });
    } else if (this.state.supplierModalState === 2 && this.state.isSkipDataMapping) {
      if (this.state.supplyErrorMessages.length === 0) {
        this.props.saveSupplierNameAndDescription(
          this.state.supplier_name,
          this.state.supplier_description,
          (data: any) => {
            this.props.postProductTrackGroupId(data.id, this.state.supplier_name);
            this.props.getSellers();
            console.log(this.props.new_supplier);
            if (this.props.new_supplier != null && this.state.file != '') {
              console.log('FILE IM SENDING', this.state.file);
              this.props.uploadCSV(
                String(this.props.new_supplier),
                this.state.file,
                this.state.upc,
                this.state.cost,
                this.state.title,
                this.state.msrp
              );
            }
          }
        );
      }
      this.setState({ supplierModalState: 4 });
    } else if (this.state.supplierModalState === 3 && this.state.supplyErrorMessages.length === 0) {
      this.props.saveSupplierNameAndDescription(
        this.state.supplier_name,
        this.state.supplier_description,
        (data: any) => {
          this.props.postProductTrackGroupId(data.id, this.state.supplier_name);
          this.props.getSellers();
          console.log(this.props.new_supplier);
          if (this.props.new_supplier != null && this.state.file != '') {
            console.log('FILE IM SENDING', this.state.file);
            this.props.uploadCSV(
              String(this.props.new_supplier),
              this.state.file,
              this.state.upc,
              this.state.cost,
              this.state.title,
              this.state.msrp
            );
            this.setState({ supplierModalState: this.state.supplierModalState + 1 });
          }
        }
      );
    } else if (this.state.supplierModalState === 4) {
      this.handleClose();
      this.resetUploadState();
    } else {
      this.setState({ supplierModalState: this.state.supplierModalState + 1 });
    }
  };

  previousModalState = () => {
    if (this.state.supplierModalState === 3) {
      this.setState({ isSkipDataMapping: false });
    }
    this.setState({ supplierModalState: this.state.supplierModalState + -1 });
  };

  public onChangeSupplierDescription = async (event: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({ supplier_description: (event.target as HTMLTextAreaElement).value });
    return false;
  };

  public onChangeSupplierName = async (event: any) => {
    if (event.target.value !== '') {
      this.setState({ supplierFormError: {} });
    }
    this.setState({ supplier_name: event.target.value });
    return false;
  };

  checkUpcPriceNumeric = (data: any) => {
    data.map((row: any, index: number) => {
      if (row.UPC) {
        if (!isNaN(row.UPC)) {
        } else {
          this.setState(
            {
              supplyErrorMessages: [
                ...this.state.supplyErrorMessages,
                `ROW ${index + 2} : Error in UPC (not a number)`,
              ],
            },
            () => console.log(this.state.supplyErrorMessages)
          );
          console.log(`ROW ${index + 2} : Error in UPC (not a number)`);
        }
      }
    });
  };

  checkUpcDuplicateAndBlank = (data: any) => {
    var valueArr = data.map((row: any) => {
      return row.UPC;
    });
    valueArr.some((row: any, idx: number) => {
      if (valueArr.indexOf(row) != idx && row !== '') {
        this.setState({
          supplyErrorMessages: [
            ...this.state.supplyErrorMessages,
            `${row} : Error in UPC (duplicate)`,
          ],
        });
        console.log(`${row} : Error in UPC (duplicate)`);
      } else if (row === '') {
        this.setState({
          supplyErrorMessages: [...this.state.supplyErrorMessages, `Blank UPC found in ${idx + 2}`],
        });
        console.log(`Blank UPC found in ${idx + 2}`);
      }
    });
  };

  checkSupplierDataLength = (data: any) => {
    if (data.length > 15000) {
      this.setState({
        supplyErrorMessages: [
          ...this.state.supplyErrorMessages,
          `Supplier rows exceeds limit (15000)`,
        ],
      });
      console.log('Supplier rows exceeds 15000');
    } else {
      console.log('You good');
    }
  };

  changeSupplyHeaders = (chunk: any) => {
    var rows = chunk.split(/\r\n|\r|\n/);
    var headings = rows[0].split(',');
    headings[1] = 'product_cost';
    rows[0] = headings.join();
    return rows.join('\n');
  };

  checkDelimiter = (delimiter: string) => {
    if (delimiter !== ',') {
      this.setState({
        supplyErrorMessages: [
          ...this.state.supplyErrorMessages,
          `Delimiter used is not a comma (,)`,
        ],
      });
    }
  };

  checkBreakLine = (data: any) => {
    console.log('LOOK', data);
    data.every((rowItem: any, index: number) => {
      Object.values(rowItem).every((k: any) => {
        if ((k.match(/\n/g) || []).length !== 0) {
          this.setState({
            supplyErrorMessages: [
              ...this.state.supplyErrorMessages,
              `Row ${index + 2}: Linebreak found`,
            ],
          });
        }
        return true;
      });
    });
  };

  updateData = (result: any) => {
    this.checkUpcPriceNumeric(result.data);
    this.checkUpcDuplicateAndBlank(result.data);
    this.checkSupplierDataLength(result.data);
    this.checkDelimiter(result.meta.delimiter);
    this.checkBreakLine(result.data);
    const shortArray = result.data.slice(0, 5);
    this.setState({
      supplyData: result.data,
      shortSupplyData: Papa.unparse(shortArray),
    });
  };

  onDrop = (acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      this.setState({ file, supplyErrorMessages: [] }, () => {
        Papa.parse(this.state.file, {
          // beforeFirstChunk: this.changeSupplyHeaders,
          skipEmptyLines: 'greedy',
          complete: this.updateData,
          header: true,
        });
      });
      console.log('FILE:', file);
    });
  };

  onChangeColumnHeaderKey = (e: Event, data: any) => {
    let change: any = {};
    change[data.name] = data.value;
    this.setState(change);
  };

  backToUpload = () => {
    this.setState({ supplierModalState: 2, isSkipDataMapping: false });
  };

  onChangeTerms = (term: string) => {
    this.setState({ terms: term });
  };

  renderSupplierModalContent = () => {
    switch (this.state.supplierModalState) {
      case 1:
        return (
          <SupplierModalPage1
            onChangeSupplierName={this.onChangeSupplierName}
            supplier_description={this.state.supplier_description}
            onChangeSupplierDescription={this.onChangeSupplierDescription}
            supplier_name={this.state.supplier_name}
            supplierFormError={this.state.supplierFormError}
            onChangeColumnHeaderKey={this.onChangeColumnHeaderKey}
            timezone={this.state.timezone}
            account_status={this.state.account_status}
            group={this.state.group}
            terms={this.state.terms}
            onChangeTerms={this.onChangeTerms}
          />
        );
      case 2:
        return <SupplierModalPage2 onDrop={this.onDrop} file={this.state.file} />;

      case 3:
        return (
          <SupplierModalPage3
            onChangeColumnHeaderKey={this.onChangeColumnHeaderKey}
            file={this.state.file}
            shortSupplyData={this.state.shortSupplyData}
            upc={this.state.upc}
            cost={this.state.cost}
            title={this.state.title}
            msrp={this.state.msrp}
          />
        );

      case 4:
        return (
          <SupplierModalPage4
            supplyErrorMessages={this.state.supplyErrorMessages}
            supplier_name={this.state.supplier_name}
            backToUpload={this.backToUpload}
          />
        );

      default:
        break;
    }
  };

  onSkipDataMapping = (e: React.SyntheticEvent, data: any) => {
    this.setState({ isSkipDataMapping: data.checked });
  };

  onKeepDataMapSetting = (e: React.SyntheticEvent, data: any) => {
    this.setState({ isKeepDataMapSetting: data.checked });
  };

  renderAddNewSupplierModal = () => {
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon={true}
        style={{ width: '85%' }}
      >
        <SupplierModalState supplierModalState={this.state.supplierModalState} />
        <Modal.Content>{this.renderSupplierModalContent()}</Modal.Content>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '1.5rem',
            paddingTop: 0,
            alignItems: 'center',
          }}
        >
          {this.state.supplierModalState === 2 && (
            <div>
              <Button
                size="small"
                basic={true}
                color="grey"
                style={{ borderRadius: 20 }}
                onClick={() => console.log('download template')}
              >
                <Icon name="cloud upload" color={'grey'} size="small" /> Download Template
              </Button>
              <Checkbox
                style={{ marginLeft: '1em' }}
                onChange={this.onSkipDataMapping}
                label="Skip Data Mapping"
              />
            </div>
          )}
          {this.state.supplierModalState === 3 && (
            <Checkbox
              style={{ marginLeft: '1em' }}
              onChange={this.onKeepDataMapSetting}
              label="Keep Data Map Setting"
            />
          )}
          {(this.state.supplierModalState === 2 ||
            this.state.supplierModalState === 3 ||
            (this.state.supplierModalState === 4 &&
              this.state.supplyErrorMessages.length !== 0)) && (
            <Button
              size="small"
              basic={true}
              color="grey"
              style={{ borderRadius: 20, marginLeft: '1em' }}
              onClick={this.previousModalState}
              content="Back"
            />
          )}
          <Button
            size="small"
            basic={true}
            color="blue"
            disabled={
              (this.state.file === '' && this.state.supplierModalState === 2) ||
              (this.state.supplyErrorMessages.length !== 0 && this.state.supplierModalState === 4)
            }
            style={{ borderRadius: 20, marginLeft: '1em' }}
            onClick={this.nextModalState}
            content={this.state.supplierModalState === 4 ? 'Close' : 'Next'}
          />
        </div>
      </Modal>
    );
  };

  public deleteSupplier = () => {
    this.props.deleteSupplier(this.state.delete_supplier_container.id, (data: any) => {
      this.setState({ delete_confirmation: false });
      this.props.getSellers();
    });
  };

  handleSort = (clickedColumn: keyof Supplier) => {
    const { sortedColumn, sortDirection } = this.state;
    const suppliers = JSON.parse(JSON.stringify(this.state.suppliers));
    console.log(clickedColumn);
    if (sortedColumn !== clickedColumn) {
      const sortedSuppliers = suppliers.sort((a: Supplier, b: Supplier) => {
        let aColumn, bColumn;
        if (clickedColumn == 'rate') {
          aColumn = Number(a[clickedColumn]);
          bColumn = Number(b[clickedColumn]);
        } else {
          aColumn = a[clickedColumn];
          bColumn = b[clickedColumn];
        }

        if (aColumn < bColumn) {
          return -1;
        }
        if (aColumn > bColumn) {
          return 1;
        }
        return 0;
      });
      this.setState({
        sortedColumn: clickedColumn,
        suppliers: sortedSuppliers,
        sortDirection: 'ascending',
      });
    } else {
      this.setState({
        suppliers: suppliers.reverse(),
        sortDirection: sortDirection === 'ascending' ? 'descending' : 'ascending',
      });
    }
  };

  renderTable = () => {
    const { sortedColumn, sortDirection } = this.state;
    const currentPage = this.state.currentPage - 1;
    const suppliers = [...this.state.suppliers].slice(
      currentPage * this.state.singlePageItemsCount,
      (currentPage + 1) * this.state.singlePageItemsCount
    );
    return this.state.suppliers.length == 0 ? (
      <Segment>
        <Loader
          hidden={this.state.suppliers.length == 0 ? false : true}
          active={true}
          inline="centered"
          size="massive"
        >
          Loading
        </Loader>
      </Segment>
    ) : (
      <Table sortable={true} basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={sortedColumn === 'name' ? sortDirection : undefined}
              onClick={() => this.handleSort('name')}
            >
              Supplier Name
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" width={1}>
              Status
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center"
              sorted={sortedColumn === 'p2l_ratio' ? sortDirection : undefined}
              onClick={() => this.handleSort('p2l_ratio')}
            >
              Product to Listing Ratio
              <span>
                {' '}
                <Popup
                  trigger={<Icon name="question circle" color={'grey'} />}
                  position="top left"
                  size="tiny"
                  content="Product to Listing Ratio"
                />
              </span>
            </Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center"
              sorted={sortedColumn === 'rate' ? sortDirection : undefined}
              onClick={() => this.handleSort('rate')}
            >
              Supplier Rate (%)
              <span>
                {' '}
                <Popup
                  trigger={<Icon name="question circle" color={'grey'} />}
                  position="top left"
                  size="tiny"
                  content="Supplier Rate (%)"
                />
              </span>
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.state.suppliers[0].id == -10000000 ? (
            <Table.Row key={134}>
              <Table.Cell>
                <h1>Data not found</h1>
              </Table.Cell>
            </Table.Row>
          ) : (
            suppliers.map((value: Supplier, index) => {
              return (
                <Table.Row key={value.id}>
                  <Table.Cell style={{ width: '600px' }}>
                    <Table.Cell as={Link} to={`/syn/${value.id}`}>
                      {value.name}
                    </Table.Cell>
                  </Table.Cell>
                  <Table.Cell textAlign="center">{value.status}</Table.Cell>
                  <Table.Cell
                    textAlign="center"
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Dropdown
                      className={'SynDropDown'}
                      text="SYN"
                      selectOnBlur={false}
                      fluid={true}
                      selection={true}
                      options={[
                        {
                          key: '0',
                          text: 'SYN',
                          value: 'SYN',
                        },
                      ]}
                      onChange={(e, data) => {
                        console.log(data.value);
                        if (localStorage.getItem(localStorageKeys.isMWSAuthorized) == 'true') {
                          if (data.value === 'SYN') {
                            history.push(`/syn/${value.id}`);
                          }
                        } else {
                          this.message.title = 'Unauthorized Access';
                          this.message.message = 'MWS Auth token not found';
                          this.message.description = 'Please Setup MWS Authorization Token';
                          this.message.to = '/dashboard/setting';
                          this.message.icon = 'warning sign';
                          this.message.color = '#cf3105';
                          this.handleMessageModal();
                        }
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center">{value.p2l_ratio}</Table.Cell>
                  <Table.Cell textAlign="center">{Number(value.rate).toLocaleString()}</Table.Cell>
                  <Table.Cell textAlign="right" style={{ paddingRight: '10px' }}>
                    <Table.Cell as={Link}>
                      <Icon
                        name="refresh"
                        style={{ color: 'black' }}
                        onClick={() => {
                          if (localStorage.getItem(localStorageKeys.isMWSAuthorized) == 'true') {
                          } else {
                            this.message.title = 'Unauthorized Access';
                            this.message.message = 'MWS Auth token not found';
                            this.message.description = 'Please Setup MWS Authorization Token';
                            this.message.to = '/dashboard/setting';
                            this.message.icon = 'warning sign';
                            this.message.color = '#cf3105';
                            this.handleMessageModal();
                          }
                        }}
                      />
                      &nbsp;
                    </Table.Cell>
                    <Table.Cell
                      as={Link}
                      to={{}}
                      onClick={() => {
                        this.openUpdateSupplierPopup(value);
                      }}
                    >
                      <Icon name="pencil" style={{ color: 'black' }} />
                      &nbsp;
                    </Table.Cell>
                    <Table.Cell
                      onClick={() => {
                        this.setState({
                          delete_confirmation: true,
                          delete_supplier_container: value,
                        });
                      }}
                      as={Link}
                      to="/syn"
                    >
                      <Icon name="trash alternate" style={{ color: 'black' }} />
                    </Table.Cell>
                  </Table.Cell>
                </Table.Row>
              );
            })
          )}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Pagination
                totalPages={this.state.totalPages}
                activePage={this.state.currentPage}
                onPageChange={(event, data) => {
                  this.setState({
                    currentPage: data.activePage,
                  });
                }}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
        <Confirm
          content="Do you want to delete supplier?"
          open={this.state.delete_confirmation}
          onCancel={() => {
            this.setState({
              delete_confirmation: false,
              delete_supplier_container: {
                contact: '',
                description: '',
                email: '',
                freight_fee: '',
                id: 0,
                item_active_count: '',
                item_total_count: '',
                name: '',
                phone: '',
                rate: '',
                seller_id: 0,
                status: '',
                supplier_group_id: 1,
                timezone: '',
                upcharge_fee: '',
                website: '',
                xid: '',
              },
            });
          }}
          onConfirm={() => {
            this.deleteSupplier();
          }}
        />
      </Table>
    );
  };

  render() {
    return (
      <AdminLayout
        auth={this.props.match.params.auth}
        sellerData={this.props.sellerData}
        title={'Suppliers'}
        callToAction={
          <Button
            basic={true}
            color="black"
            primary={true}
            style={{ borderRadius: '50px' }}
            onClick={this.handleAddNewSupplierModalOpen}
          >
            Add New Supplier
          </Button>
        }
      >
        <Segment basic={true} className="setting">
          <Divider
            style={{
              borderTop: '1px solid rgba(34,36,38,.20)',
              borderBottom: '1px solid rgba(34,36,38,.20)',
            }}
          />
          <Grid>
            <Grid.Column width={5} floated="left" className={'middle aligned'}>
              {this.renderAddNewSupplierModal()}
            </Grid.Column>
            <Grid.Column width={5} floated="right">
              <Card raised={true} style={{ borderRadius: 10, width: 290 }}>
                <Card.Content
                  style={{
                    paddingTop: 4,
                    paddingBottom: 4,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      padding: '11px',
                    }}
                  >
                    <span>
                      Time Saved
                      <h2>
                        {this.props.time_efficiency_data.length > 0
                          ? Number(this.props.time_efficiency_data[0].saved_time).toFixed(0) +
                            ' hrs'
                          : '0 hrs'}
                      </h2>
                    </span>
                    <span style={{ marginLeft: 15, flex: 'right' }}>
                      Efficiency
                      <h2>
                        {this.props.time_efficiency_data.length > 0
                          ? Number(this.props.time_efficiency_data[0].efficiency).toFixed(0) + ' %'
                          : '0 %'}
                      </h2>
                    </span>
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
          {this.renderTable()}
          <Modals
            title=""
            size="large"
            open={this.state.isMessageModalOn}
            close={this.handleMessageModal}
            bCloseIcon={true}
          >
            <Container textAlign="center">
              <MesssageComponent message={this.message} isModal={true} />
              <Segment textAlign="center" basic={true}>
                <Button
                  style={buttonStyle}
                  content="Ok"
                  onClick={this.handleMessageModal}
                  as={Link}
                  to={this.message.to}
                />
              </Segment>
            </Container>
          </Modals>
        </Segment>
      </AdminLayout>
    );
  }

  handleMessageModal = () => {
    const { isMessageModalOn } = this.state;
    this.setState({
      isMessageModalOn: !isMessageModalOn,
    });
  };
}

const mapStateToProps = (state: any) => {
  return {
    suppliers: state.synReducer.suppliers,
    uploadCSVResponse: state.synReducer.uploadCSVResponse,
    new_supplier: state.synReducer.new_supplier,
    time_efficiency_data: state.synReducer.time_efficiency_data,
    sellerData: state.settings.profile,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSellers: () => dispatch(getSellers()),
    getBasicInfoSeller: () => dispatch(getBasicInfoSeller()),
    resetUploadCSVResponse: () => dispatch(resetUploadCSVResponse()),
    getIsMWSAuthorized: () => dispatch(getIsMWSAuthorized()),
    postProductTrackGroupId: (supplierID: string, supplierName: string) =>
      dispatch(postProductTrackGroupId(supplierID, supplierName)),
    getTimeEfficiency: () => dispatch(getTimeEfficiency()),
    saveSupplierNameAndDescription: (name: string, description: string, callBack: any) =>
      dispatch(saveSupplierNameAndDescription(name, description, callBack)),
    updateSupplierNameAndDescription: (
      name: string,
      description: string,
      update_product_id: string,
      callBack: any
    ) => dispatch(updateSupplierNameAndDescription(name, description, update_product_id, callBack)),
    deleteSupplier: (supplier_id: any, callBack: any) =>
      dispatch(deleteSupplier(supplier_id, callBack)),
    uploadCSV: (
      new_supplier_id: string,
      file: any,
      upc: string,
      cost: string,
      title: string,
      msrp: string
    ) => dispatch(uploadCSV(new_supplier_id, file, upc, cost, title, msrp)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Suppliers);
