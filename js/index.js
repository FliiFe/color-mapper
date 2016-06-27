var originalImageUrl = $('#originalSize')[0].getAttribute('src');
var colorizedImageUrl = $('#colorized')[0].getAttribute('src');

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
    $('#start')[0].addEventListener('click', function () {
        $('#start')[0].value = 'Mapping colors...';
        setTimeout(launchWebWorker, 100);
    });
    $('#save')[0].addEventListener('click', function () {
        window.open(canvas.toDataURL());
    })
}

function workOutRatios() {
    window.widthRatio = $('#colorized')[0].width / $('#originalSize')[0].width;
    window.heightRatio = $('#colorized')[0].height / $('#originalSize')[0].height;
}

function pixelNumberFromCoords(x, y, refcanvas) {
    return y * refcanvas.width + x;
}

function launchWebWorker() {
    var worker = new Worker('/js/webworker.js');
    worker.onmessage = function (message) {
        if (message.data === 'end') {
            $('#start')[0].value = 'Done !'
        } else if (message.data.toString().indexOf('%') >= 0) {
            $('#progress')[0].innerText = "Progress: " + message.data;
        } else {
            ctx.putImageData(message.data, 0, 0);
        }
    }
    var initialData = {
        colorizedImageData: ctx2.getImageData(0, 0, canvas2.width, canvas2.height),
        imageData: ctx.getImageData(0, 0, canvas.width, canvas.height),
        widthRatio: window.widthRatio,
        heightRatio: window.heightRatio,
        bigWidth: canvas.width,
        smallWidth: canvas2.width
    };
    worker.onerror = function (err) {
        console.error(err);
    }
    worker.postMessage(initialData);
}
