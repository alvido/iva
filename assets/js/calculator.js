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
    amountVAT: amountVAT,
    finalAmount: finalAmount,
    quantity: totalQuantity,
    rate: rateVAT,
  });

  console.log(annualData);

  renderChart(annualData);
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

  returnChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "VAT amount",
          data: amountVAT,
          backgroundColor: "#2D5AFD",
          borderRadius: 16,
        },
        {
          label: "Quantity",
          data: quantityData,
          backgroundColor: "#4AB3FF",
          borderRadius: 16,
        },
        {
          label: "Final amount",
          data: finalAmountData,
          backgroundColor: "#A3CDFE",
          borderRadius: 16,
        },
      ],
    },
    options: {
      scales: {
        x: {
          beginAtZero: true,
          stacked: false, // Отключаем stacking, чтобы бары отображались отдельно
        },
        y: {
          stacked: false, // Отключаем stacking для оси Y
          beginAtZero: true,
        },
      },
      indexAxis: "x", // Меняем ось для горизонтального графика
      responsive: true,
      plugins: {
        legend: {
          position: "right", // Легенда будет отображаться справа
        },
        title: {
          display: false, // Заголовок отключен
          text: "Chart.js Horizontal Bar Chart",
        },
      },
    },
  });
}
