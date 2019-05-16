'use strict';

var LIKES_MIN = 15;
var LIKES_MAX = 200 - LIKES_MIN;
var picturesQuantity = 25;
var pictureTemplate = document.querySelector('#picture-template')
  .content.querySelector('.picture');
var pictureListElement = document.querySelector('.pictures');
var pictureListGallery = document.querySelector('.gallery-overlay');
var picturesDescription = [];

// Создаем массим адресов фотографий из папки
function getImages(picturesQuantity) {
  var picturesFromFolder = [];
  var image = [];
  for (var i = 1; i <= picturesQuantity; i++) {
    image = new Image;
    image.src = "photos/" + i + ".jpg";
    picturesFromFolder.push(image.src);
  };
  return picturesFromFolder;
};
var picture = getImages(picturesQuantity);

// Генерируем случайное количество лайков от 15 до 200
var likesQuantity = function() {
  return Math.ceil(LIKES_MIN + (Math.random() * LIKES_MAX));
};

// Генерируем один или два комментария
var comment = function(commentsQuantity) {
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var commentsToPicture = [];
  for (var i = 0; i <= commentsQuantity; i++) {
    commentsToPicture.unshift(COMMENTS[Math.floor(Math.random() * COMMENTS.length)])[i];
  }

  return commentsToPicture;
};

// Коструктор объекта для описания фотографии
function PictureDescription(picture) {
  this.url = picture;
  this.likes = likesQuantity();
  this.comments = comment(Math.round(Math.random())).length;
};

// Создаем массив объектов
function getPictureDescription(picture) {
  var pictureDescription = [];
  for (var i = 0; i < picture.length; i++) {
    pictureDescription = new PictureDescription(picture[i]);
    picturesDescription.push(pictureDescription);
  };
  return picturesDescription;
}
var picturesDescription = getPictureDescription(picture);

// Рендерим по шаблону
var pictureRender = function(picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture img').src = picture.url;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments;
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;

  return pictureElement;
}

// Вставляем в HTML документ
var fragment = document.createDocumentFragment();
for (var i = 0; i < picturesDescription.length; i++) {
  fragment.appendChild(pictureRender(picturesDescription[i]));
}
pictureListElement.appendChild(fragment);

/*__________Задание 2__________*/

var pictureOpen = pictureListElement.querySelectorAll('.picture');
var pictureClose = pictureListGallery.querySelector('.gallery-overlay-close');

// Фунции открытия и закрытия Popup'a
var onPopupPressEsc = function(evt) {
  if (evt.keyCode === 27) {
    closePopup();
  };
};
var openPopup = function() {
  pictureListGallery.classList.remove('hidden');
  document.addEventListener('keydown', onPopupPressEsc);
};
var closePopup = function() {
  pictureListGallery.classList.add('hidden');
  document.removeEventListener('keydown', onPopupPressEsc);
};
var OpenPopupClick = function(index) {
  index.addEventListener("click", function (){
    pictureListGallery.querySelector('.gallery-overlay-image').src = index.querySelector('img').src;
    pictureListGallery.querySelector('.likes-count').textContent = index.querySelector('.picture-likes').textContent;
    pictureListGallery.querySelector('.comments-count').textContent = index.querySelector('.picture-comments').textContent;
    openPopup();
  });
};
var OpenPopupKeydown = function(index) {
  index.addEventListener("keydown", function (evt){
    if (evt.keyCode === 13) {
      pictureListGallery.querySelector('.gallery-overlay-image').src = index.querySelector('img').src;
      pictureListGallery.querySelector('.likes-count').textContent = index.querySelector('.picture-likes').textContent;
      pictureListGallery.querySelector('.comments-count').textContent = index.querySelector('.picture-comments').textContent;
      openPopup();
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
  if (evt.keyCode === 13) {
    closePopup();
  }
});

/*_________________________*/

var uploadForm = document.querySelector('#upload-select-image');
var uploadPhotoField = uploadForm.querySelector('#upload-file');
var uploadPhotoFieldLabel = uploadForm.querySelector('.upload-control');
var uploadOverlay = uploadForm.querySelector('.upload-overlay');
var uploadOverlayClose = uploadForm.querySelector('.upload-form-cancel');
var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
var uploadFormDescription = document.querySelector('.upload-form-description');

// Функции открытия и закрытия Overlay
var closeUploadOverlay = function() {
  // Очистка формы при закрытии
  uploadForm.reset();
  clearEffects();
  scalePhoto(0);

  uploadOverlay.classList.add('hidden');
  uploadPhotoField.value = '';
  document.removeEventListener('keydown', onUploadOverlayPressEsc);
};
var openUploadOverlay = function() {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayPressEsc);
};
var onUploadOverlayPressEsc = function(evt) {
  if (evt.keyCode === 27) {
    closeUploadOverlay();
  };
};

// События
uploadPhotoField.addEventListener('click', function() {
  uploadPhotoField.addEventListener('change', function() {
    openUploadOverlay();
  });
});
uploadPhotoFieldLabel.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 13) {
    uploadPhotoField.click();
    uploadPhotoField.addEventListener('change', function() {
    openUploadOverlay();
    });
  };
});
uploadOverlayClose.addEventListener('click', function() {
  closeUploadOverlay();
});
uploadOverlayClose.addEventListener('keydown', function(evt){
  if (evt.keyCode === 13) {
    closeUploadOverlay();
  };
});

// Убираем событие закрытия формы клавишей Ecs при фокусе в полях ввода
uploadFormHashtags.onfocus = function() {
  document.removeEventListener('keydown', onUploadOverlayPressEsc);
};
uploadFormDescription.onfocus = function() {
  document.removeEventListener('keydown', onUploadOverlayPressEsc);
};
uploadFormHashtags.onblur = function() {
  document.addEventListener('keydown', onUploadOverlayPressEsc);
};
uploadFormDescription.onblur = function() {
  document.addEventListener('keydown', onUploadOverlayPressEsc);
};

/*_________________________*/

// Форма ввода масштаба

var resizeInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
var resizeDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
var resizeValue = uploadOverlay.querySelector('.upload-resize-controls-value');

var scaleValue = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

var scalePhoto = function (directionScale) {
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
var effectControl = uploadForm.querySelector('.upload-effect-controls')
var effects = uploadForm.querySelector('.upload-effect-controls')
var imagePreview = uploadForm.querySelector('.effect-image-preview');

// Функция очистки эффектов
var clearEffects = function() {
  imagePreview.classList.remove('effect-chrome');
  imagePreview.classList.remove('effect-sepia');
  imagePreview.classList.remove('effect-marvin');
  imagePreview.classList.remove('effect-phobos');
  imagePreview.classList.remove('effect-heat');
};

// Функция установки эффекта
var setEffect = function(evt) {
  var element = evt.target;
  console.log(element);
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

/*_________________________*/

// Хэш-теги

var MAX_HASHTAG_LENGTH = 20;
var MAX_HASHTAGS_QUANTITY = 5;
var hashtagsInput = uploadForm.querySelector('.upload-form-hashtags');
var uploadFormSubmit = uploadForm.querySelector('.upload-form-submit');


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
  var quantity = 0;
  for (var i = 0; i < hashtagsArray.length; i++) {
    quantity++;
  }
  return quantity;
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

/*_________________________*/

