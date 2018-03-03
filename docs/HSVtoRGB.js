/**
 * 
 * @param {number} h 
 * @param {number} s 
 * @param {number} v 
 * @return {r:number, g:number, b:number} each value is 0.0-1.0 value
 */
function HSVtoRGB(h, s, v) {
  var r = v
  var g = v
  var b = v
  if (s > 0.0) {
    h *= 6.0;
    var i = Math.floor(h);
    const f = h - i;
    switch (i) {
      case 0:
        g *= 1 - s * (1 - f);
        b *= 1 - s;
        break;
      case 1:
        r *= 1 - s * f;
        b *= 1 - s;
        break;
      case 2:
        r *= 1 - s;
        b *= 1 - s * (1 - f);
        break;
      case 3:
        r *= 1 - s;
        g *= 1 - s * f;
        break;
      case 4:
        r *= 1 - s * (1 - f);
        g *= 1 - s;
        break;
      case 5:
        g *= 1 - s;
        b *= 1 - s * f;
        break;
    }
  }
  return {r, g, b}
}

