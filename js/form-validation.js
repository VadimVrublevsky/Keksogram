'use strict';

(function() {

  // Хэш-теги

  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAGS_QUANTITY = 5;
  var hashtagsInput = window.overlay.uploadForm.querySelector('.upload-form-hashtags');
  var uploadFormSubmit = window.overlay.uploadForm.querySelector('.upload-form-submit');


  // Ошибка при вводе Хэш-тегов
  var setErrorMessage = function(errorMessage) {
    var message = hashtagsInput.setCustomValidity(errorMessage);
    return message;
  }

  // Подсветка поля красным цветом
  var setColorErrorField = function() {
    return hashtagsInput.style.borderColor = 'red';
  };

  var setDefaultColorField = function() {
    return hashtagsInput.style.borderColor = 'inherit';
  }

  // Функция получения количества Хэш-тегов
  var getQuantityHashtags = function(hashtagsArray) {
    var quantityHashtags = 0;
    for (var i = 0; i < hashtagsArray.length; i++) {
      quantityHashtags++;
    }
    return quantityHashtags;
  };

  // Функция выявления повторяющихся Хэш-тегов
  var getRepeatHashtags = function(hashtagsArray) {
    var hashtagsArrayNoRepeat = [];
    for (var u = 0; u < hashtagsArray.length; u++) {
      if (hashtagsArrayNoRepeat.includes(hashtagsArray[u])) {
        continue;
      }
      else {
        hashtagsArrayNoRepeat.push(hashtagsArray[u]);
      }
    }
    return hashtagsArrayNoRepeat;
  };

  hashtagsInput.addEventListener('input', function() {
    var errorMessage = '';
    var hashtagsText = hashtagsInput.value.trim();
    var hashtagsArray = hashtagsText.toLowerCase().split(' ');
    setDefaultColorField();

    // Удаляем лишние пробелы между Хэш-тегами
    hashtagsArray = hashtagsArray.filter(function (element) {
      return element != '';
    });

    if (getQuantityHashtags(hashtagsArray) > MAX_HASHTAGS_QUANTITY) {
      errorMessage = 'Нельзя указать больше пяти хэш-тегов!';
      setColorErrorField();
    };

    if (hashtagsArray.length > getRepeatHashtags(hashtagsArray).length) {
      errorMessage = 'Один и тот же хэш-тег не может быть использован дважды!';
      setColorErrorField();
    };

    for (var z = 0; z < hashtagsArray.length; z++) {
      var hashtag = hashtagsArray[z];
      if (hashtag[0] !== '#') {
        errorMessage = 'Хэш-тег должен начинаться с символа '+ '#' +'!';
        setColorErrorField();
      }
      else if (hashtag.length === 1) {
        errorMessage = 'Хэш-тег не может состоять только из '+ '#' +'!';
        setColorErrorField();
      }
      else if (hashtag.length > MAX_HASHTAG_LENGTH) {
        errorMessage = 'Максимальная длина одного хэш-тега 20 символов!';
        setColorErrorField();
      }
    };

    setErrorMessage(errorMessage);

  });

})();
