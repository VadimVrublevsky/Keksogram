'use strict';

(function() {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;


  window.util = {
    isEscEvt: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    },
    isEnterEvt: function(evt) {
      return evt.keyCode === ENTER_KEYCODE;
    }
  };
})();
