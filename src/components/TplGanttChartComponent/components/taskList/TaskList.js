/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import Config from '../../helpers/config/Config';
import SelectionFilter from '../../../FormFilters/SelectionFilter';
import { TIME_SETTINGS_OPTIONS } from '../../../../constants/PerfectStock/OrderPlanning';
import { Icon, Popup, Checkbox } from 'semantic-ui-react';
import ToggleRadio from '../../../../components/ToggleRadio';
// import styles from './TaskList.module.scss';
import { setActiveTplInbound } from '../../../../actions/PerfectStock/Tpl';
import { getActiveTplInbound } from '../../../../selectors/PerfectStock/Tpl';

export class VerticalLine extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="timeLine-main-data-verticalLine" style={{ left: this.props.left }} />;
  }
}

export class TaskRow extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isPopupOpen: false,
    selectedPrioritySku: { name: this.props.prioritySku, value: null },
    prioritySkuOptions: {},
    isOpen: false,
  };

  onChange = value => {
    if (this.props.onUpdateTask) {
      this.props.onUpdateTask(this.props.item, { name: value });
    }
  };

  handleChangePrioritySku = ({ value, name }) => {
    this.setState({ selectedPrioritySku: { name, value } });

    this.props.handleUpdatePrioritySku({
      id: this.props.item.id,
      po_sku_id: parseInt(value),
      is_priority: true,
    });

    if (this.getSelectedPurchaseOrder()?.id === this.props.activeTplInbound?.id) {
      const updatedActivePurchaseOrder = cloneDeep(this.getSelectedPurchaseOrder());

      updatedActivePurchaseOrder.merchant_listings.forEach(item => {
        if (item.id.toString() === value) {
          item.is_priority = true;
        } else item.is_priority = false;
      });

      this.props.setActiveTplInbound(updatedActivePurchaseOrder);
    }
  };

  getSelectedPurchaseOrder() {
    return this.props.purchaseOrders.find(purchaseOrder => {
      return purchaseOrder.id === this.props.item.id;
    });
  }

  render() {
    const isFirstRow = this.props.item.id === -1;
    return (
      <div
        className="timeLine-side-task-row"
        style={{
          ...Config.values.taskList.task.style,
          top: this.props.top,
          height: this.props.itemheight,
        }}
      >
        <div tabIndex={this.props.index} className="timeLine-side-task-row-name">
          <div className="timeLine-side-task-row-name-text">
            <Checkbox
              checked={
                this.props.checkedPurchaseOrders.find(po => po.id === this.props.item.id) ===
                undefined
                  ? false
                  : true
              }
              onChange={() => {
                this.props.handleCheckPurchaseOrder(this.props.item);
              }}
              label=""
            />
            <span
              onClick={() => {
                this.props.onSelectItem(this.props.item);
                this.props.onSelectTask(this.props.item);
              }}
              style={
                this.props.isSelected
                  ? {
                      backgroundColor: '#3B4557',
                      color: '#fff',
                      padding: '0px 11px',
                      borderRadius: '3px',
                    }
                  : { padding: '0px 10px', borderRadius: '3px' }
              }
            >
              {this.props.label}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>{''}</div>
          {!isFirstRow ? (
            <ToggleRadio
              isToggled={this.props.item.is_included}
              handleChange={() => this.props.handleIncludedToggle(this.props.item.id)}
              label={''}
            />
          ) : (
            <div />
          )}
          {!isFirstRow ? (
            <Popup
              on="click"
              open={this.state.isPopupOpen}
              onOpen={() => this.setState({ isPopupOpen: true })}
              onClose={() => this.setState({ isPopupOpen: false })}
              position="bottom left"
              closeOnDocumentClick
              closeOnEscape
              className="timeLine-actionsPopover"
              content={
                <>
                  <div className="timeLine-actionOptions">
                    <p>TRANSFER</p>
                    {!this.props.isDraftMode && (
                      <button
                        onClick={() => {
                          console.log('195');
                        }}
                      >
                        <Icon name="pencil" />
                        <span>Find this inbound in Amazon SC</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        this.setState({ isPopupOpen: false });
                      }}
                    >
                      <Icon name="pencil" />
                      <span>Edit 3PL inbound</span>
                    </button>
                    <button
                      onClick={() => {
                        this.props.handleDeleteTask(this.props.item);
                        this.setState({ isPopupOpen: false });
                      }}
                      disabled={!this.props.item.is_included}
                    >
                      <Icon name="trash" />
                      <span>Delete 3PL inbound</span>
                    </button>
                    <button
                      onClick={() => {
                        this.setState({ isPopupOpen: false });
                      }}
                      disabled={!this.props.item.is_included}
                    >
                      <Icon name="mail forward" />
                      <span>Export 3PL inbound</span>
                    </button>
                  </div>
                </>
              }
              trigger={
                <button className={'timeLine-triggerButton'}>
                  <Icon name="ellipsis vertical" />
                </button>
              }
            />
          ) : (
            <div className={'timeLine-triggerButton'} />
          )}
        </div>
      </div>
    );
  }
}

class TaskList extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isPopupOpen: false,
  };

  getContainerStyle(rows) {
    const new_height = rows > 0 ? rows * this.props.itemheight : 10;
    return { height: new_height };
  }

  renderTaskRow(data) {
    const result = [];
    for (let i = this.props.startRow; i < this.props.endRow + 1; i++) {
      const item = data[i];
      if (!item) break;
      result.push(
        <TaskRow
          key={i}
          index={i}
          item={item}
          label={item.name}
          prioritySku={item.prioritySku}
          purchaseOrders={this.props.purchaseOrders}
          top={i * this.props.itemheight}
          itemheight={this.props.itemheight}
          isSelected={this.props.selectedItem?.id === item?.id}
          onUpdateTask={this.props.onUpdateTask}
          onSelectItem={this.props.onSelectItem}
          onSelectTask={this.props.onSelectTask}
          nonEditable={this.props.nonEditable}
          checkedPurchaseOrders={this.props.checkedPurchaseOrders}
          handleDeleteTask={this.props.handleDeleteTask}
          handleEditTask={this.props.handleEditTask}
          handleCheckPurchaseOrder={this.props.handleCheckPurchaseOrder}
          generateNextOrder={this.props.generateNextOrder}
          handleSetPrioritySku={this.props.handleSetPrioritySku}
          handleUpdatePrioritySku={this.props.handleUpdatePrioritySku}
          handleSetPaymentTerm={this.props.handleSetPaymentTerm}
          handleConnectTpl={this.props.handleConnectTpl}
          handleIncludedToggle={this.props.handleIncludedToggle}
          exportPurchaseOrder={this.props.exportPurchaseOrder}
          handleDisconnectTpl={this.props.handleDisconnectTpl}
          isDraftMode={this.props.isDraftMode}
          setActiveTplInbound={this.props.setActiveTplInbound}
          activeTplInbound={this.props.activeTplInbound}
        />
      );
    }
    return result;
  }

  doScroll = () => {
    this.props.onScroll(this.refs.taskViewPort.scrollTop);
  };

  render() {
    const data = this.props.data ? this.props.data : [];
    this.containerStyle = this.getContainerStyle(data.length);
    return (
      <div className="timeLine-side">
        <div className="timeLine-side-title">
          <SelectionFilter
            label="CHART TIMELINE"
            filterOptions={TIME_SETTINGS_OPTIONS}
            value={this.props.mode}
            handleChange={value =>
              this.props.handleChangeMode && this.props.handleChangeMode(value)
            }
            placeholder=""
            className="timeLine-mode-changer"
          />
          <p className="timeLine-side-title__label">{''}</p>
          <p className="timeLine-side-title__label">ACTIVE</p>
          <button
            className={`
              timeLine-triggerButton
              ${
                this.props.checkedPurchaseOrders.length === 0
                  ? 'timeLine-triggerButton__disabled'
                  : ''
              }
            `}
            onClick={() => {
              this.props.handleDeleteSelectedTasks();
              this.setState({ isPopupOpen: false });
            }}
          >
            <Icon name="trash" />
          </button>
          {/* <Popup
              on="click"
              open={this.state.isPopupOpen}
              onOpen={() => this.setState({ isPopupOpen: true })}
              onClose={() => this.setState({ isPopupOpen: false })}
              position="bottom left"
              closeOnDocumentClick
              closeOnEscape
              className="timeLine-actionsPopover"
              content={
                <>
                  <div className="timeLine-actionOptions">
                    <p>ORDER</p>
                    <button
                      onClick={() => {
                        this.props.handleDeleteAllTasks();
                        this.setState({ isPopupOpen: false });
                      }}
                    >
                      <Icon name="trash" />
                      <span>Delete All Orders</span>
                    </button>
                  </div>
                </>
              }
              trigger={
                <button className={'timeLine-triggerButton'}>
                  <Icon name="ellipsis vertical" />
                </button>
              }
            /> */}
          <p />
        </div>
        <div ref="taskViewPort" className="timeLine-side-task-viewPort" onScroll={this.doScroll}>
          <div className="timeLine-side-task-container" style={this.containerStyle}>
            {this.renderTaskRow(data)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeTplInbound: getActiveTplInbound(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveTplInbound: task => {
      dispatch(setActiveTplInbound(task));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
