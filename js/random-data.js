'use strict';

(function() {

  // Генерируем случайное количество лайков от 15 до 200
  window.getRandomQuantityLikes = function() {
    var LIKES_MIN = 15;
    var LIKES_MAX = 200 - LIKES_MIN;
    return Math.ceil(LIKES_MIN + (Math.random() * LIKES_MAX));
  };

  // Генерируем один или два комментария
  window.getRandomComments = function() {
    var commentsQuantity = Math.round(Math.random());
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

  window.randomData = {
    getRandomQuantityLikes: getRandomQuantityLikes,
    getRandomComments: getRandomComments
  };

})();
