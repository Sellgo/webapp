import React, { Component } from 'react';
import { DATA_CONTAINER_WIDTH } from '../../Const';
import DataTask from '../../components/viewport/DataTask';
import DateHelper from '../../helpers/DateHelper';
import sizeMe from 'react-sizeme';
import Config from '../../helpers/config/Config';
import { templateSettings } from 'lodash';

export class DataRow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className="timeLine-main-data-row"
        style={{
          ...Config.values.dataViewPort.rows.style,
          top: this.props.top,
          height: this.props.itemheight,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export class DataViewPort extends Component {
  constructor(props) {
    super(props);
    this.childDragging = false;
  }
  getContainerHeight(rows) {
    let new_height = rows > 0 ? rows * this.props.itemheight : 10;
    return new_height;
  }
  onChildDrag = dragging => {
    this.childDragging = dragging;
  };

  renderRows = () => {
    let result = [];
    for (let i = this.props.startRow; i < this.props.endRow + 1; i++) {
      let item = this.props.data[i];
      if (!item) break;
      //FIXME PAINT IN BOUNDARIES
      let new_position = DateHelper.dateToPixel(
        item.start,
        this.props.nowposition,
        this.props.dayWidth
      );
      let new_width =
        DateHelper.dateToPixel(item.end, this.props.nowposition, this.props.dayWidth) -
        new_position;
      result.push(
        <DataRow
          key={i}
          label={item.name}
          top={i * this.props.itemheight}
          left={20}
          itemheight={this.props.itemheight}
          isDraftMode={this.props.isDraftMode}
        >
          <DataTask
            item={item}
            label={item.name}
            nowposition={this.props.nowposition}
            dayWidth={this.props.dayWidth}
            color={item.color}
            left={new_position}
            width={new_width}
            height={this.props.itemheight}
            onChildDrag={this.onChildDrag}
            isSelected={this.props.selectedItem && item && this.props.selectedItem.id == item.id}
            onSelectItem={this.props.onSelectItem}
            onStartCreateLink={this.props.onStartCreateLink}
            onFinishCreateLink={this.props.onFinishCreateLink}
            onTaskChanging={this.props.onTaskChanging}
            onUpdateTask={this.props.onUpdateTask}
            subTasks={item.subTasks}
            onSelectTask={this.props.onSelectTask}
            isDraftMode={this.props.isDraftMode}
          >
            {' '}
          </DataTask>
        </DataRow>
      );
    }
    return result;
  };

  doMouseDown = e => {
    if (e.button === 0 && !this.childDragging) {
      this.props.onMouseDown(e);
    }
  };
  doMouseMove = e => {
    this.props.onMouseMove(e, this.refs.dataViewPort);
  };

  doTouchStart = e => {
    if (!this.childDragging) {
      this.props.onTouchStart(e);
    }
  };
  doTouchMove = e => {
    this.props.onTouchMove(e, this.refs.dataViewPort);
  };

  componentDidMount() {
    this.refs.dataViewPort.scrollLeft = 0;
  }

  render() {
    if (this.refs.dataViewPort) {
      this.refs.dataViewPort.scrollLeft = this.props.scrollLeft;
      this.refs.dataViewPort.scrollTop = this.props.scrollTop;
    }

    let height = this.getContainerHeight(this.props.data.length);
    return (
      <div
        ref="dataViewPort"
        id="timeLinedataViewPort"
        className="timeLine-main-data-viewPort"
        onMouseDown={this.doMouseDown}
        onMouseMove={this.doMouseMove}
        onMouseUp={this.props.onMouseUp}
        onMouseLeave={this.props.onMouseLeave}
        onTouchStart={this.doTouchStart}
        onTouchMove={this.doTouchMove}
        onTouchEnd={this.props.onTouchEnd}
        onTouchCancel={this.props.onTouchCancel}
      >
        <div
          className="timeLine-main-data-container"
          style={{ height: height, width: DATA_CONTAINER_WIDTH, maxWidth: DATA_CONTAINER_WIDTH }}
        >
          {this.renderRows()}
        </div>
      </div>
    );
  }
}

export default sizeMe({ monitorWidth: true, monitorHeight: true })(DataViewPort);
