import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { mapCssPercent } from '../../lib/helpers';
import './RoomPosition.scss';

const RoomPosition = ({
  roomPosition: { top, left, width, height },
  roomPosition,
  layoutHeight,
  layoutWidth,
  setRoomPosition,
  savePosition,
  cancelPosition
}) => {
  const [roomBorderPosition, setRoomBorderPosition] = React.useState(roomPosition);
  const [roomMoved, setRoomMoved] = React.useState(false);

  return (
    <Fragment>
      <div className="RoomPosition__border" style={mapCssPercent(roomBorderPosition)}>
        {!roomMoved && (
          <div className="RoomPosition__borderButtons">
            <div onClick={savePosition} className="Button Button__green">Save</div>
            <div onClick={cancelPosition} className="Button Button__red">Cancel</div>
          </div>
        )}
      </div>

      {!roomMoved && (
        <Draggable
          defaultPosition={{
            x: layoutWidth * (left + width) / 100,
            y: layoutHeight * (top + height) / 100
          }}
          bounds={{
            left: (layoutWidth * left / 100) + 100,
            top: (layoutHeight * top / 100) + 100,
            right: layoutWidth,
            bottom: layoutHeight
          }}
          onStop={(e, { x, y }) => setRoomPosition({
            top,
            left,
            width: (100 * x / layoutWidth) - left,
            height: (100 * y / layoutHeight) - top
          })}
          onDrag={(e, { x, y }) => setRoomBorderPosition({
            top,
            left,
            width: (100 * x / layoutWidth) - left,
            height: (100 * y / layoutHeight) - top
          })}
        >
          <div className="RoomPosition__size"></div>
        </Draggable>
      )}

      <Draggable
        defaultPosition={{
          x: layoutWidth * left / 100,
          y: layoutHeight * top / 100
        }}
        bounds={{
          left: 0,
          top: 0,
          right: (layoutWidth * (100 - width) / 100),
          bottom: (layoutHeight * (100 - height) / 100)
        }}
        onStart={() => setRoomMoved(true)}
        onDrag={(e, { x, y }) => setRoomBorderPosition({
          width,
          height,
          left: (100 * x / layoutWidth),
          top: (100 * y / layoutHeight)
        })}
        onStop={(e, { x, y }) => {
          setRoomPosition({
            width,
            height,
            left: (100 * x / layoutWidth),
            top: (100 * y / layoutHeight)
          });
          setRoomMoved(false);
        }}
      >
        <div className="RoomPosition__position"></div>
      </Draggable>
    </Fragment>
  );
};

export default RoomPosition;