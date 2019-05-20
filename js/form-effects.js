'use strict';

(function() {

  // Форма ввода масштаба

  var resizeInc = window.overlay.uploadForm.querySelector('.upload-resize-controls-button-inc');
  var resizeDec = window.overlay.uploadForm.querySelector('.upload-resize-controls-button-dec');
  var resizeValue = window.overlay.uploadForm.querySelector('.upload-resize-controls-value');
  var effectControl = window.overlay.uploadForm.querySelector('.upload-effect-controls')
  var effects = window.overlay.uploadForm.querySelector('.upload-effect-controls')
  var imagePreview = window.overlay.uploadForm.querySelector('.effect-image-preview');

  var scaleValue = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  window.scalePhoto = function (directionScale) {
    var currentScale = parseInt(resizeValue.value, 10);
    currentScale = currentScale + (scaleValue.STEP * directionScale);
    if (currentScale >= scaleValue.MIN && currentScale <= scaleValue.MAX) {
      resizeValue.value = currentScale + '%';
      // Изменение масштаба изображения
      imagePreview.style.transform = 'scale(' + currentScale / 100 + ')';
    }
  };
  resizeInc.addEventListener('click', function () {
    scalePhoto(1);
  });
  resizeDec.addEventListener('click', function () {
    scalePhoto(-1);
  });

  /*_________________________*/

  // Применение эффекта к изображению

  // Функция очистки эффектов
  window.clearEffects = function() {
    imagePreview.classList.remove('effect-chrome');
    imagePreview.classList.remove('effect-sepia');
    imagePreview.classList.remove('effect-marvin');
    imagePreview.classList.remove('effect-phobos');
    imagePreview.classList.remove('effect-heat');
  };

  // Функция установки эффекта
  var setEffect = function(evt) {
    var element = evt.target;
    switch(element.id) {
      case 'upload-effect-none':
        clearEffects();
        break;
      case 'upload-effect-chrome':
        clearEffects();
        imagePreview.classList.add('effect-chrome');
        break;
      case 'upload-effect-sepia':
        clearEffects();
        imagePreview.classList.add('effect-sepia');
        break;
      case 'upload-effect-marvin':
        clearEffects();
        imagePreview.classList.add('effect-marvin');
        break;
      case 'upload-effect-phobos':
        clearEffects();
        imagePreview.classList.add('effect-phobos');
        break;
      case 'upload-effect-heat':
        clearEffects();
        imagePreview.classList.add('effect-heat');
        break;
    };
  };

  // Установка эффекта по клику
  effects.addEventListener('click', setEffect);

  window.formEffects = {
    clearEffects: clearEffects,
    scalePhoto: scalePhoto
  };

})();
