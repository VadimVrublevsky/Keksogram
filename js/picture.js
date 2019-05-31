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
  var onDataFromServer = function(data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(pictureRender(data[i]));
    }
    pictureListElement.appendChild(fragment);
    window.actionsWithPopup();
  };


  window.load(onDataFromServer);


    // var pictureOpen = pictureListElement.querySelectorAll('.picture');
    // var pictureListGallery = document.querySelector('.gallery-overlay');
    // var pictureClose = pictureListGallery.querySelector('.gallery-overlay-close');

    // // Фунции открытия и закрытия Popup'a
    // var onPopupPressEsc = function(evt) {
    //   if (window.util.isEscEvt(evt)) {
    //     closePopup();
    //   };
    // };
    // var openPopup = function(index) {
    //   pictureListGallery.classList.remove('hidden');
    //   showBigPhoto(index);
    //   document.addEventListener('keydown', onPopupPressEsc);
    // };
    // var closePopup = function() {
    //   pictureListGallery.classList.add('hidden');
    //   document.removeEventListener('keydown', onPopupPressEsc);
    // };
    // var showBigPhoto = function(index) {
    //   pictureListGallery.querySelector('.gallery-overlay-image').src = index.querySelector('img').src;
    //   pictureListGallery.querySelector('.likes-count').textContent = index.querySelector('.picture-likes').textContent;
    //   pictureListGallery.querySelector('.comments-count').textContent = index.querySelector('.picture-comments').textContent;
    // };
    // var OpenPopupClick = function(index) {
    //   index.addEventListener("click", function (){
    //     openPopup(index);
    //   });
    // };
    // var OpenPopupKeydown = function(index) {
    //   index.addEventListener("keydown", function (evt){
    //     if (window.util.isEnterEvt(evt)) {
    //       openPopup(index);
    //     };
    //   });
    // };

    // // События
    // pictureOpen.forEach(OpenPopupClick);
    // pictureOpen.forEach(OpenPopupKeydown);
    // pictureClose.addEventListener('click', function() {
    //   closePopup();
    // });
    // pictureClose.addEventListener('keydown', function(evt) {
    //   if (window.util.isEnterEvt(evt)) {
    //     closePopup();
    //   };
    // });

})();
