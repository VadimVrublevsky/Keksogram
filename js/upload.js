'use strict';

(function() {
  var URL = 'https://js.dump.academy/kekstagram';

  window.upload = function(data) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    var onError = function(message) {
      console.error(message);
      alert(message);
    };
    var onSuccess = function(data) {
      var jsonData = data;
      console.log(jsonData);
    };

    xhr.addEventListener('error', function() {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function() {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс, пожалуйста, повторите попытку позже!');
    });

    xhr.addEventListener('load', function() {
      console.log(xhr.status);
      var error;

      switch (xhr.status) {
        case 200:
        onSuccess(xhr.response);
        break;

        case 400:
        error = 'Неверный запрос';
        break;

        case 401:
        error = 'Пользователь не авторизован';
        break;

        case 404:
        error = 'Ничего не найдено';
        break;

        default:
        error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      };

      if (error) {
        onError(error);
      };

      window.overlay.closeUploadOverlay();
    });

    xhr.open('POST', URL);
    xhr.send(data);

  };

})();
