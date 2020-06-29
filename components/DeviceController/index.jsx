import React, { Fragment } from 'react';
import { times } from 'lodash';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import classnames from 'classnames';
import { mapCssPercent, hexToRGB, rainbow } from '../../lib/helpers';
import './DeviceController.scss';

// import fan from '../../public/img/schema.png';
import fan from './icons/fan.png';
import led from './icons/led.png';
import ceilingLamp from './icons/ceilingLamp.png';
import ledStrip from './icons/ledStrip.png';
import monitor from './icons/monitor.png';
import toilet from './icons/toilet.png';

const controllerIcons = { fan, led, ceilingLamp, ledStrip, monitor, toilet };

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    zIndex: 2
  }
};

const DeviceController = ({ css, icon, name, status, setIsBlocked } ) => {
  const DeviceControllerCss = (DeviceController) => {
    // const hext = '#' + rainbow.temperature.colourAt(DeviceController.temperature);
    // const hexl = '#' + rainbow.light.colourAt(DeviceController.light);
    const css = mapCssPercent(DeviceController.css);
    return {
      ...css
    };
  }

  const [deviceModal, toggleDeviceModal] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const segments = 8;
  const [hoverValue, setHoverValue] = React.useState(status);

  return (
    <div
      className={classnames("DeviceController", {
        DeviceController__active: isActive
      })}
      style={{
        backgroundImage: `linear-gradient(to top, rgba(238, 255, 0, 0.9) ${parseInt(status, 10)}%, rgba(177,177,177,1) ${1 + parseInt(status, 10)}%);`
      }}
      onClick={(e) => {
        setIsActive(true);
        setIsBlocked(true);
        e.preventDefault();
      }}
    >
      <img src={controllerIcons[icon]} className="DeviceController__icon" alt={name}/>

      {isActive && (
        <Fragment>
          
          <div className="Switch">
            {times(segments, (i) => {
              return (
                <div
                  className={classnames("Switch__block", {
                    Switch__blockActive: hoverValue >= (segments - i) * 100 / segments
                  })}
                  onMouseEnter={() => setHoverValue( (segments - i) * 100 / segments)}
                  onClick={() => alert(hoverValue)}
                  onMouseLeave={() => setHoverValue(status)}
                ></div>
              );
            })}
          </div>
          <a
            onClick={(e) => {
              setIsActive(false);
              setIsBlocked(false);
              e.stopPropagation();
            }}
            className="Close"
          >X</a>
        </Fragment>
      )}
    </div>
  );
};

{/* <Modal
        isOpen={deviceModal}
        onRequestClose={() => toggleDeviceModal(false)}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        Some details
      </Modal> */}

DeviceController.propTypes = {};

DeviceController.defaultProps = {};

export default DeviceController;