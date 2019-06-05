'use strict';

(function() {

  // Хэш-теги

  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAGS_QUANTITY = 5;
  var hashtagsInput = window.overlay.uploadForm.querySelector('.upload-form-hashtags');

  var Error = {
    TO_MANY_HASHTAGS: 'Нельзя указать больше пяти хэш-тегов!',
    DUPLICATE_HASHTAG: 'Один и тот же хэш-тег не может быть использован дважды!',
    NO_HASH: 'Хэш-тег должен начинаться с символа '+ '#' +'!',
    NO_TAG: 'Хэш-тег не может состоять только из '+ '#' +'!',
    TO_LONG_HASHTAG: 'Максимальная длина одного хэш-тега 20 символов!'
  };

  // Ошибка при вводе Хэш-тегов
  var setErrorMessage = function(errorMessage) {
    var message = hashtagsInput.setCustomValidity(errorMessage);
    return message;
  };

  // Подсветка поля красным цветом
  var setColorErrorField = function() {
    return hashtagsInput.style.borderColor = 'red';
  };

  var setDefaultColorField = function() {
    return hashtagsInput.style.borderColor = 'inherit';
  };

  // Функция получения количества Хэш-тегов
  var getQuantityHashtags = function(hashtagsArray) {
    return hashtagsArray.length;
  };

  // Функция выявления повторяющихся Хэш-тегов
  var getRepeatHashtags = function(hashtagsArray) {
    var hashtagsArrayNoRepeat = [];
    hashtagsArray.forEach(function(hashtag) {
      if (!hashtagsArrayNoRepeat.includes(hashtag)) {
        hashtagsArrayNoRepeat.push(hashtag);
      };
    });
    return hashtagsArrayNoRepeat.length;
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
      errorMessage = Error.TO_MANY_HASHTAGS;
    };

    if (getQuantityHashtags(hashtagsArray) > getRepeatHashtags(hashtagsArray)) {
      errorMessage = Error.DUPLICATE_HASHTAG;
    };

    hashtagsArray.forEach(function (hashtag) {
      if (hashtag[0] !== '#') {
        errorMessage = Error.NO_HASH;
      }
      else if (hashtag.length === 1) {
        errorMessage = Error.NO_TAG;
      }
      else if (hashtag.length > MAX_HASHTAG_LENGTH) {
        errorMessage = Error.TO_LONG_HASHTAG;
      };
    });

    if (errorMessage) {
      setColorErrorField();
    };

    setErrorMessage(errorMessage);

  });

})();
