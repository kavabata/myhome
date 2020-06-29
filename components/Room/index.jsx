import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get } from 'lodash';
import { graphql } from 'react-apollo';
import { mapCssPercent, hexToRGB, rainbow } from '../../lib/helpers';
import { constrollersList } from '../DeviceController/stub';
import DeviceController from '../DeviceController';
import Thermometer from '../Thermometer';
import RoomPositionMutation from './roomPosition.graphql';


import './Room.scss';
import RoomPosition from './RoomPosition';

const roomCss = (room) => {
  const hext = '#' + rainbow.temperature.colourAt(room.temperature);
  const hexl = '#' + rainbow.light.colourAt(room.light);
  const position = mapCssPercent(room.position);
  return {
    ...position,
    backgroundImage: `linear-gradient(to top, ${hexToRGB(hexl, 0.1)}, ${hexToRGB(hexl, 0.5)})`
  };
};


const Room = ({ room, layoutRef, roomPositionMutation } ) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [roomPosition, setRoomPosition] = React.useState(room.position);

  return (
    <Fragment>
      <div className="Room" style={roomCss({ ...room, position: roomPosition })}>
        <div
          className={classnames("RoomName", { 'RoomName--error': !!room.status })}
          onClick={() => setIsEdit(true)}
        >
          {room.name}
        </div>

        <div className="Room__devices">
          {constrollersList.map((c) => <DeviceController {...c} key={c.name} />)}
        </div>

        <Thermometer temperature={room.temperature} />
      </div>
      {isEdit && (
        <RoomPosition 
          roomPosition={roomPosition}
          layoutHeight={get(layoutRef, 'current.clientHeight', 0)}
          layoutWidth={get(layoutRef, 'current.clientWidth', 0)}
          setRoomPosition={setRoomPosition}
          savePosition={() => roomPositionMutation(room.id, roomPosition) && setIsEdit(false)}
          cancelPosition={() => setRoomPosition(room.position) && setIsEdit(false)}
        />
      )}
    </Fragment>
  );
};

Room.propTypes = {
  edit: PropTypes.bool,
  layoutRef: PropTypes.object
};

Room.defaultProps = {
  edit: false,
  layoutRef: {}
}

export default graphql(RoomPositionMutation, {
  props: ({ mutate }) => ({
    roomPositionMutation: (roomId, { top, left, width, height }) =>
      mutate({
        variables: {
          roomId, top, left, width, height
        }
      })
  })
})(Room);