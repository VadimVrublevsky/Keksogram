'use strict';

(function() {

  // Создаем массим адресов фотографий из папки
  function getImages() {
    var picturesFromFolder = [];
    var image = [];
    var picturesQuantity = 25;
    for (var i = 1; i <= picturesQuantity; i++) {
      image = new Image;
      image.src = "photos/" + i + ".jpg";
      picturesFromFolder.push(image.src);
    };

    return picturesFromFolder;

  };

  window.picturesData = {
    getImages: getImages
  };

})();
