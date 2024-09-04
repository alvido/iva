let returnChartInstance = null; // Инициализация переменной для хранения экземпляра графика возврата

// Обработчик события загрузки страницы
document.addEventListener("DOMContentLoaded", () => {
  // Массив идентификаторов входных элементов
  const inputs = ["quantity", "rate"];

  // Добавляем обработчики событий для каждого входного элемента
  inputs.forEach((id) => {
    const element = document.getElementById(id);
    if (element.type === "checkbox" || element.tagName === "SELECT") {
      // Если элемент является чекбоксом или выпадающим списком
      element.addEventListener("change", calculateReturns); // Добавляем обработчик изменения
    } else {
      element.addEventListener("input", calculateReturns); // Добавляем обработчик ввода
    }
  });

  calculateReturns(); // Вызываем calculateReturns() при загрузке страницы
});

// Функция для расчета данных
function calculateReturns() {
  const quantity = parseFloat(document.getElementById("quantity").value);
  const rate = parseFloat(document.getElementById("rate").value) / 100;

  let totalQuantity = quantity;
  let rateVAT = rate;

  let finalAmount = totalQuantity * rateVAT;

  let amountVAT = totalQuantity + finalAmount;

  const annualData = [];

  annualData.push({
    quantity: totalQuantity,
    finalAmount: finalAmount,
    amountVAT: amountVAT,
    rate: rateVAT,
  });

  render(quantity, finalAmount, amountVAT);
  renderChart(annualData);
}

function render(quantity, finalAmount, amountVAT) {
  // Массив с числами для каждого элемента balance
  const numbers = [quantity, finalAmount, amountVAT];

  // Находим все элементы с классом .balance
  const balanceElements = document.querySelectorAll(".balance");

  // Перебираем каждый .balance и вставляем соответствующие числа и метки
  balanceElements.forEach((balanceElement, index) => {
    const integerElement = balanceElement.querySelector(".balance__integer");
    const fractionElement = balanceElement.querySelector(".balance__fraction");

    // Получаем число и текстовую метку для текущего .balance
    const number = numbers[index];

    // Разделение числа на целую и дробную части
    const integerPart = Math.floor(number); // Целая часть
    const fractionPart = (number - integerPart).toFixed(2).substring(2); // Дробная часть

    // console.log(quantity, finalAmount, amountVAT);

    // Проверяем, что integerElement и subElement существуют
    if (integerElement) {
      integerElement.textContent = integerPart;
    }
    if (fractionElement) {
      fractionElement.textContent = fractionPart;
    }
  });
}

// Функция для отображения графика данных
function renderChart(data) {
  const ctx = document.getElementById("returnChart").getContext("2d");

  if (returnChartInstance) {
    returnChartInstance.destroy();
  }

  const labels = data.map((_, i) => ``);
  const amountVAT = data.map((d) => d.amountVAT);
  const finalAmountData = data.map((d) => d.finalAmount);
  const quantityData = data.map((d) => d.quantity);

  function updateChartBorderRadius() {
    const windowWidth = window.innerWidth;
    let borderRadiusValue = 16; // Значение по умолчанию

    // Меняем значение borderRadius в зависимости от ширины окна
    if (windowWidth < 768) {
      borderRadiusValue = 8; // Меньший радиус для маленьких экранов
    } else if (windowWidth >= 768 && windowWidth < 1200) {
      borderRadiusValue = 12; // Средний радиус для средних экранов
    } else {
      borderRadiusValue = 16; // Большой радиус для больших экранов
    }

    // Обновляем параметры графика
    returnChartInstance.data.datasets.forEach((dataset) => {
      dataset.borderRadius = borderRadiusValue;
    });

    returnChartInstance.update(); // Обновляем график
  }

  // Создаем график изначально
  function updateChartOptions(chart) {
    const isSmallScreen = window.innerWidth < 768; // Условие для маленьких экранов, можно изменить ширину по своему усмотрению

    chart.options.plugins.legend.position = isSmallScreen ? "bottom" : "right";

    chart.data.datasets.forEach((dataset) => {
      dataset.borderRadius = isSmallScreen ? 8 : 16; // Меняем borderRadius в зависимости от размера экрана
    });

    chart.update(); // Обновляем график с новыми параметрами
  }

  function initializeChart() {
    return new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Importe",
            data: amountVAT,
            backgroundColor: "#2D5AFD",
            borderRadius: 16, // Начальное значение borderRadius
          },
          {
            label: "Cantidad",
            data: quantityData,
            backgroundColor: "#4AB3FF",
            borderRadius: 16, // Начальное значение borderRadius
          },
          {
            label: "IVA",
            data: finalAmountData,
            backgroundColor: "#A3CDFE",
            borderRadius: 16, // Начальное значение borderRadius
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            stacked: false,
          },
          y: {
            stacked: false,
            beginAtZero: true,
          },
        },
        indexAxis: "x", // Оставляем график горизонтальным
        responsive: true,
        plugins: {
          legend: {
            position: "right", // Начальное значение позиции легенды
            labels: {
              font: {
                size: 12, // Размер шрифта текста легенды
                family: "'Poppins', sans-serif", // Шрифт текста легенды
                // style: "italic", // Стиль текста (normal, italic, oblique)
                // weight: "bold", // Толщина шрифта (normal, bold, bolder)
              },
              // color: "#333", // Цвет текста легенды
              // boxWidth: 20, // Ширина маркера
              // boxHeight: 20, // Высота маркера (в некоторых версиях Chart.js)
              // padding: 20, // Отступы между элементами легенды
              usePointStyle: true, // Использовать круги вместо квадратов для маркеров
              pointStyle: "circle", // Форма маркера (rect, rectRounded, circle, etc.)
            },
          },
          title: {
            display: false,
            text: "Chart.js Horizontal Bar Chart",
          },
        },
      },
    });
  }

  // Инициализируем график
  returnChartInstance = initializeChart();

  // Настраиваем изменение параметров при изменении размера окна
  window.addEventListener("resize", () => {
    updateChartOptions(returnChartInstance);
  });

  // Вызываем функцию один раз для установки правильных значений при загрузке страницы
  updateChartOptions(returnChartInstance);
}
