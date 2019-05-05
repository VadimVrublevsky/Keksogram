'use strict';

var LIKES_MIN = 15;
var LIKES_MAX = 200 - LIKES_MIN;
var picturesQuantity = 25;
var pictureTemplate = document.querySelector('#picture-template')
  .content.querySelector('.picture');
var pictureListElement = document.querySelector('.pictures');
var pictureListGallery = document.querySelector('.gallery-overlay');

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

var picturesDescription = [
  {
    url: picture[0],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[1],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[2],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[3],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[4],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[5],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[6],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[7],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[8],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[9],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[10],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[11],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[12],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[13],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[14],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[15],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[16],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[17],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[18],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[19],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[20],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[21],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[22],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[23],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  },
  {
    url: picture[24],
    likes: likesQuantity(),
    comments: comment(Math.round(Math.random())).length
  }
];

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

// Вставляем 1-ый элемент массива в popup
document.querySelector('.gallery-overlay').classList.remove('hidden');
pictureListGallery.querySelector('.gallery-overlay-image').src = picturesDescription[0].url;
pictureListGallery.querySelector('.likes-count').textContent = picturesDescription[0].likes;
pictureListGallery.querySelector('.comments-count').textContent = picturesDescription[0].comments;
