document.addEventListener('scroll', function() {
    var windowHeight = window.innerHeight; // Высота окна браузера
    var scrollY = window.scrollY; // Текущая прокрутка
    var image = document.querySelector('.death-star'); // Элемент изображения
  
    if (scrollY < windowHeight * 1.5) {
      // Если прокрутка меньше половины высоты окна
      image.style.opacity = 1 - (scrollY / (windowHeight * 1.5)); // Постепенно уменьшаем прозрачность
    } else {
      image.style.opacity = 0; // Скрываем изображение
    }
  });
