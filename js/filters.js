'use strict';

(function() {

  window.load(function(data){

      var formFilters = document.querySelector('.filters');
      var filters = formFilters.querySelectorAll('input[type=radio]');
      var dataFromServerRecommend = data;
      var dataFromServerPopular = dataFromServer.slice();
      var dataFromServerDiscussed = dataFromServer.slice();
      var dataFromServerRandom = dataFromServer.slice();

      var popularSorted = dataFromServerPopular.sort(function (left, right) {
        return right.likes - left.likes;
      });
      var discussedSorted = dataFromServerDiscussed.sort(function (left, right) {
        return right.comments.length - left.comments.length;
      });
      var randomSorted = dataFromServerRandom.sort(function (left, right) {
        return Math.random() - 0.5;
      });
     
      var addClickListener = function(filter) {
        filter.addEventListener('click', function(){
          switch (filter.value) {
            case 'popular': 
            window.picture.onDataFromServer(popularSorted, true);
            break;

            case 'discussed':
            window.picture.onDataFromServer(discussedSorted, true); 
            break;

            case 'random':
            window.picture.onDataFromServer(randomSorted, true);
            break;

            case 'recommend':
            default:
            window.picture.onDataFromServer(dataFromServerRecommend, true); 
            break;
          }
        });
      };

      filters.forEach(function(filter) {
        addClickListener(filter);
      });
  });

})();
