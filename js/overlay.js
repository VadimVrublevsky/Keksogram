'use strict';

(function() {

  window.uploadForm = document.querySelector('#upload-select-image');
  window.uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  window.uploadFormDescription = document.querySelector('.upload-form-description');
  var uploadPhotoField = uploadForm.querySelector('#upload-file');
  var uploadPhotoFieldLabel = uploadForm.querySelector('.upload-control');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadOverlayClose = uploadForm.querySelector('.upload-form-cancel');


  // Функции открытия и закрытия Overlay
  var closeUploadOverlay = function() {
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

  // События
  uploadPhotoField.addEventListener('click', function() {
    uploadPhotoField.addEventListener('change', function() {
      openUploadOverlay();
    });
  });
  uploadPhotoFieldLabel.addEventListener('keydown', function(evt) {
    if (window.util.isEnterEvt(evt)) {
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

  window.overlay = {
    uploadForm: uploadForm,
    uploadFormHashtags: uploadFormHashtags,
    uploadFormDescription, uploadFormDescription
  };

})();
