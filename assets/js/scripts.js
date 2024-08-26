// Burger Menu Open //
// Burger Menu Open //
document.addEventListener("DOMContentLoaded", function () {
  // Выбираем бургер-кнопку и навигацию
  let burgerButton = document.getElementById("burgerButton");
  let navigation = document.querySelector(".navigation");
  let links = document.querySelectorAll(".navigation__link");

  // Если бургер-кнопка существует, добавляем обработчик события
  if (burgerButton) {
    burgerButton.addEventListener("click", function (e) {
      e.stopPropagation(); // Остановка всплытия события
      burgerButton.classList.toggle("burger--active"); // Переключаем класс активности бургер-кнопки
      navigation.classList.toggle("navigation--active"); // Переключаем класс активности навигации
    });
  }

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      burgerButton.classList.remove("burger--active");
      navigation.classList.remove("navigation--active");
      console.log("link", link);
    });
  });
});
//

// Fixed header
$(document).ready(function () {
  var header = $(".header"),
    main = $(".main"),
    headerH = header.innerHeight(),
    scrollOffset = $(window).scrollTop();

  checkScroll(scrollOffset);

  $(window).on("scroll", function () {
    scrollOffset = $(this).scrollTop();
    checkScroll(scrollOffset);
  });

  function checkScroll(scrollOffset) {
    if (scrollOffset >= headerH) {
      header.addClass("fixed");
      main.css("padding-top", headerH); // Добавляем верхний отступ
    } else {
      header.removeClass("fixed");
      main.css("padding-top", 0); // Убираем верхний отступ
    }
  }

  // Плавная прокрутка с учетом высоты заголовка
  $('a[href*="#"]').on("click", function (event) {
    event.preventDefault();

    var targetId = $(this).attr("href").split("#")[1],
      targetOffset = $("#" + targetId).offset().top - headerH;

    $("html, body").animate(
      {
        scrollTop: targetOffset,
      },
      300
    );
  });
});
// Fixed header end

// // select2
// // In your Javascript (external .js resource or <script> tag)
// $(document).ready(function () {
//   $("#womanInsurance, #womanStatus, #manStatus, #manInsurance").select2({
//     minimumResultsForSearch: Infinity,
//   });
// });
// //

// //faq collapse
// $(document).ready(function () {
//   $(".faq__item").on("click", function () {
//     faqCollapse($(this));
//   });
// });

// function faqCollapse($element) {
//   $element.toggleClass("active");
//   // Находим родителя и добавляем ему класс
// }
// //faq collapse

//


//
