'use strict';

(function() {
  var URL = 'https://js.dump.academy/kekstagram/data';

  window.load = function(data) {

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

    xhr.addEventListener('error', function() {
      onError(Error.CONNECT);
    });
    xhr.addEventListener('timeout', function() {
      onError(Error.TIMEOUT);
    });
    xhr.open('GET', URL);

    xhr.addEventListener('load', function() {
      var error;
      switch (xhr.status) {
        case 200:
        data(xhr.response);
        window.dataFromServer = xhr.response;
        break;

        case 400:
        error = Error.INVALID_REQUEST;
        break;

        case 401:
        error = Error.USER_NOT_FOUND;
        break;

        case 404:
        error = Error.NOT_FOUND;
        break;

        default:
        error = Error.ANOTHER;
      };

      if (error) {
        onError(error);
      };

    });

    xhr.send();
  };

  // window.load = {
  //   dataFromServer: dataFromServer
  // };

})();


