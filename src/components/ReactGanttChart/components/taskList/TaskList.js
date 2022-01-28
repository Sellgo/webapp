import React, { Component } from 'react';
import Config from '../../helpers/config/Config';
import SelectionFilter from '../../../FormFilters/SelectionFilter';
import { TIME_SETTINGS_OPTIONS } from '../../../../constants/PerfectStock/OrderPlanning';
import { Icon, Popup, Checkbox } from 'semantic-ui-react';

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

  onChange = value => {
    if (this.props.onUpdateTask) {
      this.props.onUpdateTask(this.props.item, { name: value });
    }
  };

  render() {
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
          <Checkbox
            toggle
            checked={this.props.item.is_included}
            onChange={() => this.props.handleIncludedToggle(this.props.item.id)}
          />
          <span
            onClick={e => {
              this.props.onSelectItem(this.props.item);
              this.props.onSelectTask(this.props.item);
            }}
            style={
              this.props.isSelected
                ? {
                    backgroundColor: '#4B9CF5',
                    color: '#fff',
                  }
                : {}
            }
          >
            {this.props.label}
          </span>
        </div>
        <Popup
          on="click"
          position="bottom left"
          closeOnDocumentClick
          closeOnEscape
          className="timeLine-actionsPopover"
          content={
            <>
              <div className="timeLine-actionOptions">
                <p>EDIT</p>
                <button onClick={() => this.props.handleDeleteTask(this.props.item)}>
                  <Icon name="trash" />
                  <span>Delete Order</span>
                </button>
                <button onClick={() => this.props.handleEditTask(this.props.item)}>
                  <Icon name="pencil" />
                  <span>Edit Task</span>
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
      </div>
    );
  }
}

export default class TaskList extends Component {
  constructor(props) {
    super(props);
  }

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
          top={i * this.props.itemheight}
          itemheight={this.props.itemheight}
          isSelected={this.props.selectedItem?.id === item?.id}
          onUpdateTask={this.props.onUpdateTask}
          onSelectItem={this.props.onSelectItem}
          onSelectTask={this.props.onSelectTask}
          nonEditable={this.props.nonEditable}
          handleDeleteTask={this.props.handleDeleteTask}
          handleEditTask={this.props.handleEditTask}
          handleIncludedToggle={this.props.handleIncludedToggle}
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
          {this.props.viewFilterOptions && this.props.handleChangeFilterOption && (
            <SelectionFilter
              label="View Draft Orders"
              filterOptions={this.props.viewFilterOptions}
              value={this.props.viewFilter}
              handleChange={value =>
                this.props.handleChangeFilterOption && this.props.handleChangeFilterOption(value)
              }
              placeholder="Select a template"
              className="timeLine-mode-changer"
            />
          )}

          <SelectionFilter
            label="View Timeline"
            filterOptions={TIME_SETTINGS_OPTIONS}
            value={this.props.mode}
            handleChange={value =>
              this.props.handleChangeMode && this.props.handleChangeMode(value)
            }
            placeholder=""
            className="timeLine-mode-changer"
          />
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
