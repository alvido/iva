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

// select2
// In your Javascript (external .js resource or <script> tag)
$(document).ready(function () {
  $("#womanInsurance, #womanStatus, #manStatus, #manInsurance").select2({
    minimumResultsForSearch: Infinity,
  });
});
//

//faq collapse
$(document).ready(function () {
  $(".faq__item").on("click", function () {
    faqCollapse($(this));
  });
});

function faqCollapse($element) {
  $element.toggleClass("active");
  // Находим родителя и добавляем ему класс
}
//faq collapse

//
// document.addEventListener("DOMContentLoaded", function () {
//   const inputs = document.querySelectorAll(".form__input");
//   inputs.forEach((input) => {
//     input.addEventListener("input", validateInput);
//   });

//   function validateInput(event) {
//     const input = event.target;
//     const label = document.querySelector(`label[for=${input.id}]`);
//     const errorDiv = getNextErrorMessage(input);
//     const value = input.value;

//     if (handleInput(value)) {
//       label.classList.remove("error");
//       errorDiv.style.display = "none";
//     } else {
//       label.classList.add("error");
//       errorDiv.style.display = "block";
//       if (!/^\d+$/.test(value)) {
//         errorDiv.textContent = "Expected number, received NaN";
//       } else if (Number(value) <= 0) {
//         errorDiv.textContent = "Number must be greater than 0";
//       } else if (Number(value) > 100000000) {
//         errorDiv.textContent = "Number must be less than or equal to 100000000";
//       }
//     }
//   }

//   function isValid(value) {
//     const num = Number(value);
//     return /^\d+$/.test(value) && num > 0 && num <= 100000000;
//   }

//   function getNextErrorMessage(input) {
//     let nextElement = input.nextElementSibling;
//     while (nextElement) {
//       if (nextElement.classList.contains("error-message")) {
//         return nextElement;
//       }
//       nextElement = nextElement.nextElementSibling;
//     }
//     // Если не найден элемент с классом 'error-message', создаем его
//     const errorDiv = document.createElement("div");
//     errorDiv.classList.add("error-message");
//     input.parentNode.insertBefore(errorDiv, input.nextSibling);
//     return errorDiv;
//   }
// });

//

// проверка
document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    input.addEventListener("input", handleInput);
    input.addEventListener("paste", handleInput);
    input.addEventListener("blur", handleInput);
    input.addEventListener("blur", handleBlur);
  });

  function handleInput() {
    const type = this.getAttribute("type") || "textarea";
    const value = this.value.trim(); // Убираем начальные и конечные пробелы

    let label;
    if (type === "textarea") {
      label = this.closest("label");
    } else {
      label = this.parentNode;
    }

    switch (type) {
      case "text":
        // Разрешаем только буквы и пробелы для текстового поля
        const isValidText = /^[a-zA-Zа-яА-Я0-9\s]*$/.test(value);
        if (!isValidText || value === "") {
          // Проверяем что не пустая строка
          label.classList.add("error");
        } else {
          label.classList.remove("error");
        }
        break;
      case "email":
        // Проверка на валидность email
        const isValidEmail = /\S+@\S+\.\S+/.test(value);
        if (!isValidEmail || value === "") {
          // Проверяем что не пустая строка
          label.classList.add("error");
        } else {
          label.classList.remove("error");
        }

      case "tel":
        // Проверка на валидность tel
        const isValidTel =value.replace(/^[0-9\s]/g, ""); // Разрешаем только буквы и пробелы

        if (!isValidTel || value === "") {
          // Проверяем что не пустая строка
          label.classList.add("error");
        } else {
          label.classList.remove("error");
        }
        break;
      default:
        // Проверка на обязательное заполнение для остальных типов
        if (value === "") {
          label.classList.add("error");
        } else {
          label.classList.remove("error");
        }
        break;
    }
  }

  function handleBlur() {
    if (this.required && !this.checkValidity()) {
      this.style.borderColor = "#F3AFCD";
    } else {
      this.style.borderColor = "";
    }
  }
});

// проверка

//swiper
const progressRows = document.querySelectorAll(".hero__swiper-progress");
let swiper;

swiper = new Swiper(".swiper", {
  observer: true,
  observeParents: true,
  // loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // Настройки для различных размеров экранов
  breakpoints: {
    // Когда ширина экрана >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    // Когда ширина экрана >= 480px
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // Когда ширина экрана >= 640px
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});
// swiper

// Скрытие текстареа
document.addEventListener("DOMContentLoaded", function () {
  // Получаем все элементы с классом 'full'
  const formGroups = document.querySelectorAll(".full");

  formGroups.forEach((group) => {
    const radioButtons = group.querySelectorAll('input[type="radio"]');
    const textareas = group.querySelectorAll(".hidden-textarea"); // Получаем все элементы с классом .hidden-textarea

    radioButtons.forEach((radio) => {
      radio.addEventListener("change", function () {
        if (radio.value === "yes" && radio.checked) {
          // Показываем все текстовые поля .hidden-textarea в текущем блоке .full
          textareas.forEach((textarea) => {
            textarea.style.display = "flex";
          });
        } else {
          // Скрываем все текстовые поля .hidden-textarea в текущем блоке .full
          textareas.forEach((textarea) => {
            textarea.style.display = "none";
          });
        }

        console.log(radio.value);
      });
    });
  });
});

//

//порядковый номер
// Получаем все элементы с классом form__step
const steps = document.querySelectorAll(".form__step");

// Проходимся по каждому элементу и добавляем порядковый номер перед заголовком <h3>
steps.forEach((step, index) => {
  // Создаем новый элемент span
  const stepNumber = document.createElement("span");
  // Задаем текст содержимого как порядковый номер
  stepNumber.textContent = `${index + 1}. `;
  // Вставляем span перед элементом <h3>
  step.querySelector("h3").insertAdjacentElement("afterbegin", stepNumber);
});
//
