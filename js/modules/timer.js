function timer (timerSelector, deadline) {
   //* Timer

   // Перша функція працюємо з часом та переводимо мілісекунди в дні, години і тд. Та повертаємо з неї object з цими даними (заокруглені числа)
   function nowDate (endtime) {
      const time = Date.parse(endtime) - Date.parse(new Date()),
         day = Math.floor(time / (1000 * 60 * 60 * 24)),
         hours = Math.floor(time / (1000 * 60 * 60) % 24),
         minutes = Math.floor(time / (1000 * 60) % 60),
         seconds = Math.floor(time / 1000 % 60);

      return {
         'time': time,
         'day': day,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      }
   };

   // Четверта функція для перевірки числа та додавання до нього 0
   function zero (num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else if (num < 0) {
         return `00`
      } else {
         return num;
      }
   }

   // Друга функція отримуємо елементи зі сторінки та запускаємо таймер
   function setDate (selector, endtime) {
      const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');
      
      updateClock(); // при старті сторінці оновлюємо таймер

      const timeInterval = setInterval(updateClock, 1000);

   // Третя функція отримуємо наш object з даними з першої функції. Пушимо нові дані в HTML верстку, та зупиняємо таймер згідно умови
      function updateClock () {
         const obj = nowDate(endtime)

         days.innerHTML = zero(obj.day);
         hours.innerHTML = zero(obj.hours);
         minutes.innerHTML = zero(obj.minutes);
         seconds.innerHTML = zero(obj.seconds);

         if (obj.time == 0) {
            clearInterval(timeInterval);
         }
      }
   };

   setDate(timerSelector, deadline) // викликаємо фунцію з 2-ма невідомими аргументами.
}

//module.exports = timer;
export default timer;