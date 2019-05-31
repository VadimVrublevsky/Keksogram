'use strict';

(function() {

  window.actionsWithPopup = function() {
    var pictureListElement = document.querySelector('.pictures');
    var pictureListGallery = document.querySelector('.gallery-overlay');
    var pictureOpen = pictureListElement.querySelectorAll('.picture');
    var pictureClose = pictureListGallery.querySelector('.gallery-overlay-close');

    // Фунции открытия и закрытия Popup'a
    var onPopupPressEsc = function(evt) {
      if (window.util.isEscEvt(evt)) {
        closePopup();
      };
    };
    var openPopup = function(index) {
      pictureListGallery.classList.remove('hidden');
      showBigPhoto(index);
      document.addEventListener('keydown', onPopupPressEsc);
    };
    var closePopup = function() {
      pictureListGallery.classList.add('hidden');
      document.removeEventListener('keydown', onPopupPressEsc);
    };
    var showBigPhoto = function(index) {
      pictureListGallery.querySelector('.gallery-overlay-image').src = index.querySelector('img').src;
      pictureListGallery.querySelector('.likes-count').textContent = index.querySelector('.picture-likes').textContent;
      pictureListGallery.querySelector('.comments-count').textContent = index.querySelector('.picture-comments').textContent;
    }
    var OpenPopupClick = function(index) {
      index.addEventListener("click", function (){
        openPopup(index);
      });
    };
    var OpenPopupKeydown = function(index) {
      index.addEventListener("keydown", function (evt){
        if (window.util.isEnterEvt(evt)) {
          openPopup(index);
        };
      });
    };

    // События
    pictureOpen.forEach(OpenPopupClick);
    pictureOpen.forEach(OpenPopupKeydown);
    pictureClose.addEventListener('click', function() {
      closePopup();
    });
    pictureClose.addEventListener('keydown', function(evt) {
      if (window.util.isEnterEvt(evt)) {
        closePopup();
      }
    });

  };

})();
