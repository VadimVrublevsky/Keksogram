'use strict';

(function() {

  var resizeInc = window.overlay.uploadForm.querySelector('.upload-resize-controls-button-inc');
  var resizeDec = window.overlay.uploadForm.querySelector('.upload-resize-controls-button-dec');
  var resizeValue = window.overlay.uploadForm.querySelector('.upload-resize-controls-value');
  var imagePreview = window.overlay.uploadForm.querySelector('.effect-image-preview');
  var effectControl = window.overlay.uploadForm.querySelector('.upload-effect-controls');
  var radioButtons = effectControl.querySelectorAll('input[type=radio]');
  var effectSaturation = window.overlay.uploadForm.querySelector('.upload-effect-level');
  var saturationPin = effectSaturation.querySelector('.upload-effect-level-pin');
  var saturationValue = effectSaturation.querySelector('.upload-effect-level-val');
  var effectImage = window.overlay.uploadForm.querySelector('.effect-image-preview');

  var INVERT_COEFFICIENT = 100;
  var BLUR_COEFFICIENT = 3;
  var BRIGHTNESS_COEFFICIENT = 3;

  var effectsName = ['effect-none', 'effect-chrome', 'effect-sepia', 'effect-marvin', 'effect-phobos', 'effect-heat'];
  var filters = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

  var filterSaturation;

  // Скрываем ползунок
  effectSaturation.classList.add('hidden');

  // Форма ввода масштаба

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

  // Функция очистки эффектов
  window.clearEffects = function() {
    imagePreview.classList.remove('effect-chrome');
    imagePreview.classList.remove('effect-sepia');
    imagePreview.classList.remove('effect-marvin');
    imagePreview.classList.remove('effect-phobos');
    imagePreview.classList.remove('effect-heat');
    imagePreview.style.filter = 'blur(0px)';
    saturationPin.style.left = 100 + '%';
    saturationValue.style.width = 100 + '%';
    removeEffectSaturation();
  };

  // Функции показа/скрытия ползунка насыщения
  var showEffectSaturation = function() {
    effectSaturation.classList.remove('hidden');
  };
  var removeEffectSaturation = function() {
    effectSaturation.classList.add('hidden');
  };

  // Функции установки эффектов
  var setLackOfSaturation = function() {
    removeEffectSaturation();
    for (var i = 1; i < filters.length - 1; i++) {
      objectOfFilters[filters[i]](0);
    };
  };
  var setSaturationForChrome = function(grayScale) {
    effectImage.style.filter = 'grayscale(' + grayScale + ')';
  };
  var setSaturationForSepia = function(sepia) {
    effectImage.style.filter = 'sepia(' + sepia + ')';
  };
  var setSaturationForMarvin = function(invert) {
    effectImage.style.filter = 'invert(' + invert * INVERT_COEFFICIENT + '%)';
  };
  var setSaturationForPhobos = function(blur) {
    effectImage.style.filter = 'blur(' + blur * BLUR_COEFFICIENT + 'px)';
  };
  var setSaturationForHeat = function(brightness) {
    effectImage.style.filter = 'brightness(' + brightness * BRIGHTNESS_COEFFICIENT + ')';
  };

  // Уровень насыщения для разных эффектов
  var objectOfFilters = {
    none: setLackOfSaturation,
    chrome: setSaturationForChrome,
    sepia: setSaturationForSepia,
    marvin: setSaturationForMarvin,
    phobos: setSaturationForPhobos,
    heat: setSaturationForHeat
  };

  var addClickListener = function(radioButton, effectName, filter) {
    radioButton.addEventListener('click', function() {
      clearEffects();

      if (effectName != 'effect-none') {
        showEffectSaturation();
      }
      imagePreview.classList.add(effectName);

      // Переопределяем переменную иначе - "потеря окружения"
      filterSaturation = filter;
      if (filterSaturation != 'none') {
        objectOfFilters[filterSaturation](1);
      }
      else {
        setLackOfSaturation();
      };
    });
  };

  for (var j = 0; j < radioButtons.length; j++) {
    var radioButton = radioButtons[j];
    var effectName = effectsName[j];
    var filter = filters[j];
    addClickListener(radioButton, effectName, filter);
  };

  // Насыщение
  saturationPin.addEventListener('mousedown', function(evt){
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var pinMove = saturationPin.offsetLeft - shift.x;
      var pinCoord = pinMove + 'px';

      // Условие ограничения слайдера
      if (pinMove >= 0 && pinMove <= 455) {
        saturationPin.style.left = pinCoord;
        saturationValue.style.width = pinCoord;
        var saturationLevel = pinMove / 455;

        // Регулируем уровень насыщения
        objectOfFilters[filterSaturation](saturationLevel);
      };
    };

    var onMouseUp = function(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup',onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup',onMouseUp);
  });

  window.formEffects = {
    clearEffects: clearEffects,
    scalePhoto: scalePhoto
  };

})();
