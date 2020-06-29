import React, { Fragment } from 'react';
import './Thermometer.scss';

const getTWidht = (t) => 100 * (30 - parseInt(t, 10)) / (30 - 15);

const Thermometer = ({ temperature }) => (
  <div className="Thermometer">
    <div className="Thermometer__temperature">{temperature} °C</div>
    <div className="Thermometer__shadow" style={{ width: getTWidht(temperature) + '%' }}></div>
  </div>
);

export default Thermometer;