'use strict';

(function() {

  var picture = window.picturesData.getImages();
  var picturesDescription = [];

  // Коструктор объекта для описания фотографии
  function PictureDescription(picture) {
    this.url = picture;
    this.likes = window.randomData.getRandomQuantityLikes();
    this.commentsQuantity = window.randomData.getRandomComments().length;
  };

  // Создаем массив объектов
  var getPictureDescription = function() {
    var pictureDescription = [];

    for (var i = 0; i < picture.length; i++) {
      pictureDescription = new PictureDescription(picture[i]);
      picturesDescription.push(pictureDescription);
    };
    return picturesDescription;
  }
  getPictureDescription(picturesDescription);

  window.data = picturesDescription;

})();
