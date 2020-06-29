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

import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap';


const Room = ({ room, layoutRef, roomPositionMutation } ) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [isBlocked, setIsBlocked] = React.useState(false);
  const [roomPosition, setRoomPosition] = React.useState(room.position);

  const hexl = '#' + rainbow.light.colourAt(room.light);

  const layoutHeight = get(layoutRef, 'current.clientHeight', 0);
  const layoutWidth = get(layoutRef, 'current.clientWidth', 0);

  const fits = (layoutHeight * roomPosition.height / 100 - 66)
    * (layoutWidth * roomPosition.width / 100) 
    / (10000 * constrollersList.length);
  return (
    <Fragment>
      <div
        className={classnames("Room", {
          Room__active: isBlocked || isActive && fits < 1,
          Room__edit: isEdit
        })}
        style={{
          ...mapCssPercent(roomPosition),
          backgroundImage: `linear-gradient(to top, ${hexToRGB(hexl, 0.1)}, ${hexToRGB(hexl, 0.5)})`
        }}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
      >
        <div className="Room__name">
          <Nav>
            <NavDropdown title={room.name}>
              <NavDropdown.Item onClick={() => setIsEdit(true)}>
                Change Position
              </NavDropdown.Item>
              <NavDropdown.Item>
                Controller
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </div>

        <Thermometer temperature={room.temperature} />

        <div className="Room__devices">
          {constrollersList.map((c) => <DeviceController {...c} key={c.name} setIsBlocked={setIsBlocked} />)}
        </div>
      </div>
      {isEdit && (
        <RoomPosition 
          roomPosition={roomPosition}
          layoutHeight={get(layoutRef, 'current.clientHeight', 0)}
          layoutWidth={get(layoutRef, 'current.clientWidth', 0)}
          setRoomPosition={setRoomPosition}
          savePosition={() => {
            roomPositionMutation(room.id, roomPosition);
            setIsEdit(false)
          }}
          cancelPosition={() => {
            setRoomPosition(room.position);
            setIsEdit(false);
          }}
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