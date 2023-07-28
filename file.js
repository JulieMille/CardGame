function startStopwatch(displayElement) {
    let seconds = 0;
    let stopwatchInterval;
  
    const updateDisplay = function() {
      const minutes = parseInt(seconds / 60, 10);
      const remainingSeconds = seconds % 60;
  
      const minutesDisplay = minutes < 10 ? "0" + minutes : minutes;
      const secondsDisplay = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
  
      const stopwatchText = minutesDisplay + ":" + secondsDisplay;
      displayElement.textContent = stopwatchText;
    };
  
    const start = function() {
      stopwatchInterval = setInterval(function() {
        seconds++;
        updateDisplay();
      }, 1000);
    };
  
    const stop = function() {
      clearInterval(stopwatchInterval);
    };
  
    const reset = function() {
      stop();
      seconds = 0;
      updateDisplay();
    };
  
    return {
      start: start,
      stop: stop,
      reset: reset
    };
  }
  
  // Пример использования функции для отсчета времени
  const displayElement = document.getElementById("stopwatch-display"); // Здесь предполагается, что у вас есть элемент с id "stopwatch-display" для отображения секундомера.
  const stopwatch = startStopwatch(displayElement);
  
  // Для старта, остановки и сброса секундомера используйте методы объекта "stopwatch".
  // Например:
  stopwatch.start(); // Старт секундомера
  // stopwatch.stop(); // Остановка секундомера
  // stopwatch.reset(); // Сброс секундомера
  