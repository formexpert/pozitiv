var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [56.841532, 60.655973], // Большая Конюшенная 19/8
        zoom: 16
    }, {
        searchControlProvider: 'yandex#search'
    });

    myMap.behaviors.disable('scrollZoom'), // Отключение скрола колесом мыши

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      hintContent: 'г.Екатеринбург, ул.Софьи Ковалевской, 3.',
      balloonContent: 'Мы находимся здесь'
    }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'img/logo-mp.png',
        // Размеры метки.
        iconImageSize: [42, 42],
        // Смещение левого врхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-10, -38]
    }),

  //   myGeoObject = new ymaps.GeoObject({
  //     // Описание геометрии.
  //     geometry: {
  //         type: "Point",
  //         coordinates: [56.841532, 60.655973]
  //     },
  // }, {
  //     // Метку можно перемещать.
  //     draggable: false
  // })

      myMap.geoObjects
      // .add(myGeoObject)
      .add(myPlacemark)
}
