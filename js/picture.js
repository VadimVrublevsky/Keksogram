'use strict';

(function() {

  var pictureListElement = document.querySelector('.pictures');

  // Рендерим по шаблону
  var pictureRender = function(data) {
    var pictureTemplate = document.querySelector('#picture-template')
    .content.querySelector('.picture');
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture img').src = data.url;
    pictureElement.querySelector('.picture-comments').textContent = data.comments.length;
    pictureElement.querySelector('.picture-likes').textContent = data.likes;

    return pictureElement;
  };

  // Вставляем в HTML документ
  window.onDataFromServer = function(data, clear) {
    if (clear) {
      var list = document.querySelectorAll(".picture");
        for (var i = list.length - 1; 0 <= i; i--) {
          if (list[i] && list[i].parentElement) {
            list[i].parentElement.removeChild(list[i]);
          } 
        }  
    };
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(pictureRender(data[i]));
    }
    pictureListElement.appendChild(fragment);
    window.actionsWithPopup();
  };

  window.load(onDataFromServer);

  window.picture = {
    onDataFromServer: onDataFromServer
  };
})();
