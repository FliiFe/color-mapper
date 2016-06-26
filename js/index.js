var originalImageUrl = $('#originalSize')[0].getAttribute('src');
var colorizedImageUrl = $('#colorized')[0].getAttribute('src');

var logArea = $('#logArea')[0];

var canvas = $('#result')[0];
var ctx = canvas.getContext('2d');

var canvas2 = $('#colorizedCanvas')[0];
var ctx2 = canvas2.getContext('2d');

window.onload = function () {
    canvas.height = $('#originalSize')[0].height;
    canvas.width = $('#originalSize')[0].width;
    ctx.drawImage($('#originalSize')[0], 0, 0);
    canvas2.height = $('#colorized')[0].height;
    canvas2.width = $('#colorized')[0].width;
    ctx2.drawImage($('#colorized')[0], 0, 0);
    $('#originalSize')[0].style.display = 'none';
    $('#colorized')[0].style.display = 'none';
    workOutRatios();
    startDrawing();
}

function workOutRatios() {
    window.widthRatio = $('#colorized')[0].width / $('#originalSize')[0].width;
    window.heightRatio = $('#colorized')[0].height / $('#originalSize')[0].height;
}

function pixelNumberFromCoords(x, y, refcanvas) {
    return y * refcanvas.width + x;
}

function startDrawing() {
    var colorizedImageData = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);;
    for (var x = 0; x < imageData.width; x++) {
        for (var y = 0; y < imageData.height; y++) {
            var pixel = pixelNumberFromCoords(x, y, canvas);
            var pixelOnColorizedCanvas = pixelNumberFromCoords(Math.floor(x * window.widthRatio), Math.floor(y * window.heightRatio), canvas2);
            var colorizedRgb = colorizedImageData.data.slice(pixelOnColorizedCanvas * 4, pixelOnColorizedCanvas * 4 + 3);
            var colorizedRgbObject = {
                r: colorizedRgb[0],
                g: colorizedRgb[1],
                b: colorizedRgb[2],
            };
            var colorizedHsv = tinycolor(colorizedRgbObject).toHsv();

            var gsrgb = imageData.data.slice(pixel * 4, pixel * 4 + 3);
            var gsrgbObject = {
                r: gsrgb[0],
                g: gsrgb[1],
                b: gsrgb[2],
            };
            var gsHsv = tinycolor(gsrgbObject).toHsv();

            gsHsv.s = colorizedHsv.s;
            gsHsv.h = colorizedHsv.h
            var newColor = tinycolor(gsHsv);
            imageData.data[pixel * 4 + 0] = newColor._r;
            imageData.data[pixel * 4 + 1] = newColor._g;
            imageData.data[pixel * 4 + 2] = newColor._b;
            imageData.data[pixel * 4 + 3] = 255;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}
