import React, { Component } from 'react';
import Config from '../../helpers/config/Config';
import SelectionFilter from '../../../FormFilters/SelectionFilter';
import {
  TIME_SETTINGS_OPTIONS,
  EMPTY_GANTT_CHART_PURCHASE_ORDER,
} from '../../../../constants/PerfectStock/OrderPlanning';
import { Icon, Popup, Checkbox } from 'semantic-ui-react';
import ToggleRadio from '../../../../components/ToggleRadio';
import { ReactComponent as AlignOrderIcon } from '../../../../assets/images/arrow-right-to-bracket-solid.svg';

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
  };

  onChange = value => {
    if (this.props.onUpdateTask) {
      this.props.onUpdateTask(this.props.item, { name: value });
    }
  };

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
              onClick={e => {
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
          <div className="timeLine-side-task-row-priority-sku">{this.props.prioritySku || '-'}</div>
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
                    <p>ORDER</p>
                    {!this.props.isDraftMode && (
                      <button
                        onClick={() => {
                          this.props.handleEditTask(this.props.item);
                          this.setState({ isPopupOpen: false });
                        }}
                      >
                        <Icon name="pencil" />
                        <span>Edit Order</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        this.props.handleDeleteTask(this.props.item);
                        this.setState({ isPopupOpen: false });
                      }}
                    >
                      <Icon name="trash" />
                      <span>Delete Order</span>
                    </button>
                    <p>SMART ORDER</p>
                    <button
                      onClick={() => {
                        this.props.handleSetPrioritySku(this.props.item);
                        this.setState({ isPopupOpen: false });
                      }}
                      disabled={!this.props.item.is_included}
                    >
                      <Icon name="check circle outline" />
                      <span>Set Priority SKU</span>
                    </button>
                    <button
                      onClick={() => {
                        this.props.generateNextOrder(this.props.item);
                        this.setState({ isPopupOpen: false });
                      }}
                      disabled={!this.props.item.is_included}
                    >
                      <Icon name="clipboard list" />
                      <span>Generate Smart Order</span>
                    </button>
                    <button
                      onClick={() => {
                        this.props.handleAlignOrder(this.props.item);
                        this.setState({ isPopupOpen: false });
                      }}
                      disabled={!this.props.item.is_included}
                    >
                      <AlignOrderIcon />
                      <span>Align Smart Order</span>
                    </button>
                    {!this.props.item.vendorId ? (
                      <button
                        onClick={() => {
                          this.props.handleConnectTpl(this.props.item);
                          this.setState({ isPopupOpen: false });
                        }}
                        disabled={false}
                      >
                        <Icon name="chain" />
                        <span>Connect to 3PL Manager</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          this.props.handleDisconnectTpl(this.props.item);
                          this.setState({ isPopupOpen: false });
                        }}
                        disabled={false}
                      >
                        <Icon name="broken chain" />
                        <span>Disconnect from 3PL Manager</span>
                      </button>
                    )}
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

export default class TaskList extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isPopupOpen: false,
  };

  getContainerStyle(rows) {
    let new_height = rows > 0 ? rows * this.props.itemheight : 10;
    return { height: new_height };
  }

  renderTaskRow(data) {
    let result = [];
    for (let i = this.props.startRow; i < this.props.endRow + 1; i++) {
      let item = data[i];
      if (!item) break;
      result.push(
        <TaskRow
          key={i}
          index={i}
          item={item}
          label={item.name}
          prioritySku={item.prioritySku}
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
          handleConnectTpl={this.props.handleConnectTpl}
          handleIncludedToggle={this.props.handleIncludedToggle}
          handleAlignOrder={this.props.handleAlignOrder}
          handleDisconnectTpl={this.props.handleDisconnectTpl}
          isDraftMode={this.props.isDraftMode}
        />
      );
    }
    return result;
  }

  doScroll = () => {
    this.props.onScroll(this.refs.taskViewPort.scrollTop);
  };

  render() {
    let data = this.props.data ? this.props.data : [];
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
          <p className="timeLine-side-title__label">PRIORITY SKU</p>
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
