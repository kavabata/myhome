import React, { Fragment } from 'react';
import './HomeLayout.scss';
import classnames from 'classnames';
import { mapCssPercent, hexToRGB } from '../../lib/helpers';
import Rainbow from 'rainbowvis.js';

const HomeLayout = () => {
  // console.log(css);

  const roomData = [
    {
      name: 'Kichen',
      temperature: '20',
      css: {
        top: 3,
        left: 8,
        width: 21,
        height: 47
      },
    },
    {
      name: 'Bedroom',
      temperature: '25',
      css: {
        top: 50,
        left: 8,
        width: 33,
        height: 40
      },
      status: 'alert'
    },
    {
      name: 'Kids room',
      temperature: '24',
      css: {
        top: 50,
        left: 56,
        width: 39,
        height: 50
      },
    },
    {
      name: 'Guest Room',
      temperature: '18',
      css: {
        top: 3,
        left: 56,
        width: 39,
        height: 47
      },
    },
    {
      name: 'Bathroom',
      temperature: '22',
      css: {
        top: 3,
        left: 29,
        width: 27,
        height: 32
      },
    },
    {
      name: 'Couatage',
      temperature: '22',
      css: {
        top: 35,
        left: 41,
        width: 15,
        height: 55
      },
    }
  ];



  
  let rainbow = new Rainbow();
  rainbow.setSpectrum('blue', 'green', 'red');
  rainbow.setNumberRange(10, 30);
  

  const roomCss = (room) => {

    const hex = '#' + rainbow.colourAt(room.temperature);
    const c = mapCssPercent(room.css);

    return {
      ...c,
      backgroundImage: `linear-gradient(to top, ${hexToRGB(hex, 0.15)}, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))`
    };

  }

  return (
    <div className="HomeLayout">
      {roomData.map((room) => (
        <div
          className="HomeLayout__room"
          style={roomCss(room)}
        >
          <div className={classnames("HomeLayout__roomName", { 'HomeLayout__roomName--error': !!room.status })}>
            {room.name}
          </div>

        </div>
      ))}
    </div>
  );
};

export default HomeLayout;
