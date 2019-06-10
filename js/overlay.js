'use strict';

(function() {

  window.uploadForm = document.querySelector('#upload-select-image');
  window.uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  window.uploadFormDescription = document.querySelector('.upload-form-description');
  var uploadPhotoField = uploadForm.querySelector('#upload-file');
  var uploadPhotoFieldLabel = uploadForm.querySelector('.upload-control');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadOverlayClose = uploadForm.querySelector('.upload-form-cancel');

  var FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var preview = document.querySelector('.effect-image-preview');
  var previewEffect = document.querySelectorAll('.upload-effect-preview');

  // Функции открытия и закрытия Overlay
  window.closeUploadOverlay = function() {
    // Очистка формы при закрытии
    uploadForm.reset();
    window.formEffects.clearEffects();
    window.formEffects.scalePhoto(0);

    uploadOverlay.classList.add('hidden');
    uploadPhotoField.value = '';
    document.removeEventListener('keydown', onUploadOverlayPressEsc);
  };
  var openUploadOverlay = function() {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadOverlayPressEsc);
  };
  var onUploadOverlayPressEsc = function(evt) {
    if (window.util.isEscEvt(evt)) {
      closeUploadOverlay();
    };
  };
  var onUploadOverlayPressLoadImage = function(evt) {
    var file = uploadPhotoField.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILES_TYPES.some( function(it) {
      return fileName.endsWith(it);
    });
    if(matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function() {
        preview.src = reader.result;
        previewEffect.forEach(function(it) {
          it.style.backgroundImage = 'url(' + preview.src + ')';
        });
        openUploadOverlay();
      });
      reader.readAsDataURL(file);
    }
    else {
      alert('Неверный формат изображения, пожалуйста, используйте следующие форматы ' + FILES_TYPES);
      closeUploadOverlay();
    };
  };

  // События
  uploadPhotoField.addEventListener('click', function() {
    uploadPhotoField.addEventListener('change', onUploadOverlayPressLoadImage);
  });
  uploadPhotoFieldLabel.addEventListener('keydown', function(evt) {
    if (window.util.isEnterEvt(evt)) {
      uploadPhotoField.click();
      uploadPhotoField.addEventListener('change', onUploadOverlayPressLoadImage);
    };
  });
  uploadOverlayClose.addEventListener('click', function() {
    closeUploadOverlay();
  });
  uploadOverlayClose.addEventListener('keydown', function(evt){
    if (window.util.isEnterEvt(evt)) {
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

  uploadForm.addEventListener('submit', function(evt) {
    window.upload(new FormData(uploadForm));
    evt.preventDefault();
  });

  window.overlay = {
    uploadForm: uploadForm,
    uploadFormHashtags: uploadFormHashtags,
    uploadFormDescription: uploadFormDescription,
    closeUploadOverlay: closeUploadOverlay
  };
})();
