import React, { Component } from 'react';
import Config from '../../helpers/config/Config';
import ContentEditable from '../../components/common/ContentEditable';
import SelectionFilter from '../../../FormFilters/SelectionFilter';
import { TIME_SETTINGS_OPTIONS } from '../../../../constants/PerfectStock/OrderPlanning';

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
        onClick={e => {
          this.props.onSelectItem(this.props.item);
          this.props.onSelectTask(this.props.item);
        }}
      >
        <div
          tabIndex={this.props.index}
          style={
            this.props.isSelected
              ? {
                  width: 'max-content',
                  backgroundColor: '#3B4557',
                  color: '#fff',
                  padding: '0 10px',
                }
              : { width: '90%' }
          }
        >
          {this.props.label}
        </div>
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
