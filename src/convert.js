// var array = ['subdivisions', 'padding', 'dst_canvas', 'drawImage', 'floor', 'decodeDraw', 'width', 'height', 'converterParams'];
// (function (_0x52f9e3, _0x3bdb7b) {
//   var _0x55db49 = function (_0x1e8211) {
//     while (--_0x1e8211) {
//       _0x52f9e3['push'](_0x52f9e3['shift']());
//     }
//   };
//   _0x55db49(++_0x3bdb7b);
// }(array, 0x188));
// var array = ["decodeDraw", "width", "height", "converterParams", "subdivisions", "padding", "dst_canvas", "drawImage", "floor"];
// var _0x04dd = function (_0x293393, _0x2e360e) {
//   _0x293393 = _0x293393 - 0x0;
//   var _0x1c5eba = array[_0x293393];
//   return _0x1c5eba;
// };
var Converter = function () {
  this.decodeDraw = function (coverter) {
    var width = coverter['width'];
    var height = coverter['height'];
    var subdivisions = coverter['converterParams']['subdivisions']; // 细分
    var padding = coverter['converterParams']['padding'];
    var scramble = coverter['converterParams']['scramble']; // 混杂
    var _subdivisions = subdivisions * subdivisions - 1;
    var src_img = coverter['src_img'];
    var canvas = coverter['dst_canvas']['getContext']('2d');
    for (var i = 0; i <= _subdivisions; i++) {
      var srcInfo = genInfo(src_img['width'], src_img['height'], subdivisions, padding * -1, scramble[i]);
      var targetInfo = genInfo(width, height, subdivisions, 0, i);
      canvas.drawImage(src_img, srcInfo['x'], srcInfo['y'], srcInfo['w'], srcInfo['h'], targetInfo['x'], targetInfo['y'], targetInfo['w'], targetInfo['h']);
    }
  };


  var genInfo = function (width, height, subdivisions, padding, scramble) {
    var _subdivisions = subdivisions * subdivisions - 1;
    if (scramble < 0 || _subdivisions < scramble) {
      return null;
    }
    var w = calc(width / subdivisions);
    var h = calc(height / subdivisions);
    var row = scramble % subdivisions;
    var column = Math['floor'](scramble / subdivisions);
    var x = w * row;
    var y = h * column;
    if (x + w > width) {
      x = width - w;
    }
    if (y + h > height) {
      y = height - h;
    }
    x -= padding;
    y -= padding;
    w += padding * 2;
    h += padding * 2;
    return {
      'x': x,
      'y': y,
      'w': w,
      'h': h,
      'x2': x + w,
      'y2': y + h
    };
  };


  // avg 宽度除以细分的数值
  // 计算一个大概的值作为宽高
  var calc = function (avg) {
    var init = 8;
    var temp = 1;
    while (temp * init < avg) {
      temp++;
    }
    return temp * init;
  };
};
