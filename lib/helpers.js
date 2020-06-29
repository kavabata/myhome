import Rainbow from 'rainbowvis.js';

export const hexToRGB = (hex, alpha) => {
  var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

const percent = (p) => `${p}%`

export const mapCssPercent = (obj, fnc) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, percent(v, k, i)]
    )
  )

const rainbowTemperature = new Rainbow();
rainbowTemperature.setSpectrum('#1595e6', '#89f562', '#c91e00');
rainbowTemperature.setNumberRange(17, 27);

const rainbowLight = new Rainbow();
rainbowLight.setSpectrum('#0a0a0a', '#ffffaa');
rainbowLight.setNumberRange(0, 100);

export const rainbow = {
  temperature: rainbowTemperature,
  light: rainbowLight
}
