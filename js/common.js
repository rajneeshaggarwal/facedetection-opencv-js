function loadImageToCanvas(url, cavansId) {
  let canvas = document.getElementById(cavansId);
  let ctx = canvas.getContext('2d');
  let img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
  };
  img.src = url;
};

function createFileFromUrl(paths, callback) {
  for (i in paths) {
    let path = paths[i];
    let request = new XMLHttpRequest();
    request.open('GET', path, true);
    request.responseType = 'arraybuffer';
    request.onload = function(ev) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                let data = new Uint8Array(request.response);
                cv.FS_createDataFile('/', path, data, true, false, false);
                callback();
            } else {
                console.log('Failed to load ' + path + ' status: ' + request.status);
            }
        }
    };
    request.send();

  }
  
};