var window = {};
importScripts('/js/tinycolor.js');

function pixelNumberFromCoords(x, y, width) {
    return y * width + x;
}

onmessage = function (message) {
    if (message.data.colorizedImageData && message.data.imageData) {
        for (var x = 0; x < message.data.imageData.width; x++) {
            for (var y = 0; y < message.data.imageData.height; y++) {
                var pixel = pixelNumberFromCoords(x, y, message.data.bigWidth);
                var pixelOnColorizedCanvas = pixelNumberFromCoords(Math.floor(x * message.data.widthRatio), Math.floor(y * message.data.heightRatio), message.data.smallWidth);
                var colorizedRgb = message.data.colorizedImageData.data.slice(pixelOnColorizedCanvas * 4, pixelOnColorizedCanvas * 4 + 3);
                var colorizedRgbObject = {
                    r: colorizedRgb[0],
                    g: colorizedRgb[1],
                    b: colorizedRgb[2],
                };
                var colorizedHsv = window.tinycolor(colorizedRgbObject).toHsv();

                var gsrgb = message.data.imageData.data.slice(pixel * 4, pixel * 4 + 3);
                var gsrgbObject = {
                    r: gsrgb[0],
                    g: gsrgb[1],
                    b: gsrgb[2],
                };
                var gsHsv = window.tinycolor(gsrgbObject).toHsv();

                gsHsv.s = colorizedHsv.s;
                gsHsv.h = colorizedHsv.h
                var newColor = window.tinycolor(gsHsv);
                message.data.imageData.data[pixel * 4 + 0] = newColor._r;
                message.data.imageData.data[pixel * 4 + 1] = newColor._g;
                message.data.imageData.data[pixel * 4 + 2] = newColor._b;
                message.data.imageData.data[pixel * 4 + 3] = 255;
            }
            postMessage(message.data.imageData);
            postMessage(Math.floor(x / message.data.imageData.width * 100) + '%');
        }
        postMessage(message.data.imageData);
        postMessage('100%');
        postMessage('end');
        close();
    }
}
