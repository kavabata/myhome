import React, { Fragment } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
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

const DeviceController = ({ css, icon, name, status } ) => {
  const DeviceControllerCss = (DeviceController) => {
    // const hext = '#' + rainbow.temperature.colourAt(DeviceController.temperature);
    // const hexl = '#' + rainbow.light.colourAt(DeviceController.light);
    const css = mapCssPercent(DeviceController.css);
    return {
      ...css
    };
  }

  const [deviceModal, toggleDeviceModal] = React.useState(false);

  return (
    <div
      className="DeviceController"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(238, 255, 0, 0.7) ${parseInt(status)}%, rgba(0,0,0,0) ${1+ parseInt(status)}%);`
      }}
      onClick={() => toggleDeviceModal(true)}
    >
      <img src={controllerIcons[icon]} className="DeviceController__icon" alt={name}/>
      <Modal
        isOpen={deviceModal}
        onRequestClose={() => toggleDeviceModal(false)}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        Some details
      </Modal>
    </div>
  );
};

DeviceController.propTypes = {};

DeviceController.defaultProps = {};

export default DeviceController;