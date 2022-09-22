import React, { Component } from 'react';
import DateHelper from '../../helpers/DateHelper';
import { MODE_NONE, MODE_MOVE, MOVE_RESIZE_LEFT, MOVE_RESIZE_RIGHT } from '../../Const';
import Config from '../../helpers/config/Config';
import { ReactComponent as CheckIcon } from '../../../../assets/images/check-circle-solid.svg';

export default class DataTask extends Component {
  constructor(props) {
    super(props);
    this.calculateStyle = this.calculateStyle.bind(this);
    this.state = {
      dragging: false,
      left: this.props.left,
      width: this.props.width,
      mode: MODE_NONE,
    };
  }

  onCreateLinkMouseDown = (e, position) => {
    if (e.button === 0) {
      e.stopPropagation();
      this.props.onStartCreateLink(this.props.item, position);
    }
  };
  onCreateLinkMouseUp = (e, position) => {
    e.stopPropagation();
    this.props.onFinishCreateLink(this.props.item, position);
  };
  onCreateLinkTouchStart = (e, position) => {
    e.stopPropagation();
    this.props.onStartCreateLink(this.props.item, position);
  };
  onCreateLinkTouchEnd = (e, position) => {
    e.stopPropagation();
    this.props.onFinishCreateLink(this.props.item, position);
  };

  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.doMouseMove);
      document.addEventListener('mouseup', this.doMouseUp);
      document.addEventListener('touchmove', this.doTouchMove);
      document.addEventListener('touchend', this.doTouchEnd);
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.doMouseMove);
      document.removeEventListener('mouseup', this.doMouseUp);
      document.removeEventListener('touchmove', this.doTouchMove);
      document.removeEventListener('touchend', this.doTouchEnd);
    }
  }

  dragStart(x, mode) {
    this.props.onChildDrag(true);
    this.draggingPosition = x;
    this.setState({
      dragging: true,
      mode: mode,
      left: this.props.left,
      width: this.props.width,
    });
  }
  dragProcess(x) {
    const delta = this.draggingPosition - x;
    let newLeft = this.state.left;
    let newWidth = this.state.width;

    switch (this.state.mode) {
      case MODE_MOVE:
        newLeft = this.state.left - delta;
        break;
      case MOVE_RESIZE_LEFT:
        newLeft = this.state.left - delta;
        newWidth = this.state.width + delta;
        break;
      case MOVE_RESIZE_RIGHT:
        newWidth = this.state.width - delta;
        break;
    }
    //the coordinates need to be global
    const changeObj = {
      item: this.props.item,
      position: {
        start: newLeft - this.props.nowposition,
        end: newLeft + newWidth - this.props.nowposition,
      },
    };
    this.props.onTaskChanging(changeObj);
    this.setState({ left: newLeft, width: newWidth });
    this.draggingPosition = x;
  }
  dragEnd() {
    this.props.onChildDrag(false);
    const new_start_date = DateHelper.pixelToDate(
      this.state.left,
      this.props.nowposition,
      this.props.dayWidth
    );
    const new_end_date = DateHelper.pixelToDate(
      this.state.left + this.state.width,
      this.props.nowposition,
      this.props.dayWidth
    );
    this.props.onUpdateTask(this.props.item, { start: new_start_date, end: new_end_date });
    this.setState({ dragging: false, mode: MODE_NONE });
  }

  doMouseDown = (e, mode) => {
    if (!this.props.onUpdateTask) return;
    if (e.button === 0) {
      e.stopPropagation();
      this.dragStart(e.clientX, mode);
    }
  };
  doMouseMove = e => {
    if (this.state.dragging) {
      e.stopPropagation();
      this.dragProcess(e.clientX);
    }
  };
  doMouseUp = () => {
    this.dragEnd();
  };

  doTouchStart = (e, mode) => {
    if (!this.props.onUpdateTask) return;
    e.stopPropagation();
    this.dragStart(e.touches[0].clientX, mode);
  };
  doTouchMove = e => {
    if (this.state.dragging) {
      e.stopPropagation();
      this.dragProcess(e.changedTouches[0].clientX);
    }
  };
  doTouchEnd = () => {
    this.dragEnd();
  };

  calculateStyle() {
    const configStyle = this.props.isSelected
      ? Config.values.dataViewPort.task.selectedStyle
      : Config.values.dataViewPort.task.style;

    if (this.state.dragging) {
      return {
        ...configStyle,
        backgroundColor: 'none',
        left: this.state.left,
        width: this.state.width,
        height: this.props.height - 5,
        top: 2,
      };
    } else {
      return {
        ...configStyle,
        backgroundColor: 'none',
        left: this.props.left,
        width: this.props.width,
        height: this.props.height - 5,
        top: 2,
      };
    }
  }

  render() {
    const lengthOfMainTask = this.props.item.start - this.props.item.end;
    const style = this.calculateStyle();
    return (
      <div style={style}>
        <div
          className="timeLine-main-data-task-side"
          style={{ top: 0, left: -4, height: style.height }}
        >
          <div className="timeLine-main-data-task-side-linker" />
        </div>
        <div style={{ display: 'flex' }}>
          {this.props.subTasks ? (
            this.props.subTasks.map((task, id) => {
              const lengthOfSubTask = ((task.start - task.end) / lengthOfMainTask) * 100;
              const styling = {
                background: task.color,
                width: `${lengthOfSubTask}%`,
                height: style.height,
                cursor: 'unset',
              };
              return (
                <div key={id} style={styling} className="timeLine-main-data-sub-task">
                  <span>{task.name}&nbsp;</span>
                  {task.end <= new Date() ? <CheckIcon /> : null}
                </div>
              );
            })
          ) : (
            <div style={{ overflow: 'hidden' }}>
              {Config.values.dataViewPort.task.showLabel ? this.props.item.name : ''}
            </div>
          )}
        </div>
        <div
          className="timeLine-main-data-task-side"
          style={{ top: 0, left: lengthOfMainTask - 3, height: style.height }}
        >
          <div className="timeLine-main-data-task-side-linker" />
        </div>
      </div>
    );
  }
}
