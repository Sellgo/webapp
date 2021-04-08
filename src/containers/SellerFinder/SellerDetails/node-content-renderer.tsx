import React, { Component } from 'react';
import './CustomTreeRenderer.scss';
import { Icon } from 'semantic-ui-react';

function isDescendant(older: any, younger: any) {
  return (
    !!older.children &&
    typeof older.children !== 'function' &&
    older.children.some((child: any) => child === younger || isDescendant(child, younger))
  );
}

// eslint-disable-next-line react/prefer-stateless-function
class CustomThemeNodeContentRenderer extends Component<any, any> {
  render() {
    const {
      scaffoldBlockPxWidth,
      toggleChildrenVisibility,
      connectDragPreview,
      connectDragSource,
      isDragging,
      canDrop,
      canDrag,
      node,
      title,
      subtitle,
      draggedNode,
      path,
      treeIndex,
      isSearchMatch,
      isSearchFocus,
      icons,
      buttons = [],
      className,
      style,
      didDrop,
      lowerSiblingCounts,
      listIndex,
      swapFrom,
      swapLength,
      swapDepth,
      treeId, // Not needed, but preserved for other renderers
      isOver, // Not needed, but preserved for other renderers
      parentNode, // Needed for dndManager
      ...otherProps
    } = this.props;

    console.log({
      lowerSiblingCounts,
      listIndex,
      swapFrom,
      swapLength,
      swapDepth,
      treeId, // Not needed, but preserved for other renderers
      isOver, // Not needed, but preserved for other renderers
      parentNode, // Needed for dndManager
      icons,
    });
    const nodeTitle = title || node.title;
    const nodeSubtitle = subtitle || node.subtitle;

    const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
    const isLandingPadActive = !didDrop && isDragging;

    const nodeContent = connectDragPreview(
      <div
        className={
          'row-inner' +
          (isLandingPadActive ? ` rowLandingPad` : '') +
          (isLandingPadActive && !canDrop ? ` rowCancelPad` : '') +
          (isSearchMatch ? ` rowSearchMatch` : '') +
          (isSearchFocus ? ` rowSearchFocus` : '') +
          (className ? ` ${className}` : ` ${node.className}`)
        }
        style={{
          opacity: isDraggedDescendant ? 0.5 : 1,
          ...style,
        }}
      >
        <div className={'rowContents' + (!canDrag ? ` rowContentsDragDisabled` : '')}>
          <div className={'rowLabel'}>
            <div className={'rowTitle' + (node.subtitle ? ` rowTitleWithSubtitle` : '')}>
              {typeof nodeTitle === 'function'
                ? nodeTitle({
                    node,
                    path,
                    treeIndex,
                  })
                : nodeTitle}
            </div>

            {nodeSubtitle && (
              <span className={'rowSubtitle'}>
                {typeof nodeSubtitle === 'function'
                  ? nodeSubtitle({
                      node,
                      path,
                      treeIndex,
                    })
                  : nodeSubtitle}
              </span>
            )}
          </div>

          <div className={'rowToolbar'}>
            {buttons.map((btn: any, index: number) => (
              <div
                key={index} // eslint-disable-line react/no-array-index-key
                className={'toolbarButton'}
              >
                {btn}
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    return (
      <div style={{ height: '100%' }} {...otherProps}>
        {toggleChildrenVisibility &&
          node.children &&
          (node.children.length > 0 || typeof node.children === 'function') && (
            <div>
              <Icon
                name={node.expanded ? 'minus square outline' : 'plus square outline'}
                style={{ left: -0.5 * scaffoldBlockPxWidth, color: '#757575', cursor: 'pointer' }}
                onClick={() =>
                  toggleChildrenVisibility({
                    node,
                    path,
                    treeIndex,
                  })
                }
              />

              {node.expanded && !isDragging && (
                <div style={{ width: scaffoldBlockPxWidth }} className={'lineChildren'} />
              )}
            </div>
          )}

        <div className={'rowWrapper' + (!canDrag ? ` rowWrapperDragDisabled` : '')}>
          {canDrag ? connectDragSource(nodeContent, { dropEffect: 'copy' }) : nodeContent}
        </div>
      </div>
    );
  }
}

export default CustomThemeNodeContentRenderer;
