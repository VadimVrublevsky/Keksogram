'use strict';

(function() {
  var URL = 'https://js.dump.academy/kekstagram';

  window.upload = function(data) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    var Code = {
      SUCCESS: 200,
      INVALID_REQUEST: 400,
      USER_NOT_FOUND: 401,
      NOT_FOUND: 404
    };
    var Error = {
      INVALID_REQUEST: 'Неверный запрос',
      USER_NOT_FOUND: 'Пользователь не авторизован',
      NOT_FOUND: 'Ничего не найдено',
      ANOTHER: 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText,
      CONNECT: 'Произошла ошибка соединения',
      TIMEOUT: 'Запрос не успел выполниться за ' + xhr.timeout + ' мс, пожалуйста, повторите попытку позже!'
    };
    var onError = function(message) {
      console.error(message);
      alert(message);
    };
    var onSuccess = function(data) {
      var jsonData = data;
      console.log(jsonData);
    };

    xhr.addEventListener('error', function() {
      onError(Error.CONNECT);
    });
    xhr.addEventListener('timeout', function() {
      onError(Error.TIMEOUT);
    });

    xhr.addEventListener('load', function() {
      console.log(xhr.status);
      var error;

      switch (xhr.status) {
        case Code.SUCCESS:
        onSuccess(xhr.response);
        break;

        case Code.INVALID_REQUEST:
        error = Error.INVALID_REQUEST;
        break;

        case Code.USER_NOT_FOUND:
        error = Error.USER_NOT_FOUND;
        break;

        case Code.NOT_FOUND:
        error = Error.NOT_FOUND;
        break;

        default:
        error = Error.ANOTHER;
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
