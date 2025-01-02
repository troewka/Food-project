function slider ({containerSelector, slideSelector, nextSelector, prevSelector, currentCounterSelector, totalCounterSelector, wrapperSelector, insideSelector}) {
   //* Slider

   const slide = document.querySelectorAll(slideSelector),
   slider = document.querySelector(containerSelector),  
   dotsArr = [],
   prev = document.querySelector(prevSelector),
   next = document.querySelector(nextSelector),
   current = document.querySelector(currentCounterSelector),
   total = document.querySelector(totalCounterSelector),
   slideWrapper = document.querySelector(wrapperSelector), // вікно через яке показується 1 слайд
   slideInside = document.querySelector(insideSelector), // карусель
   width = window.getComputedStyle(slideWrapper).width; // ширина вікна

   let slideIndex = 1; // current
   let offset = 0; // відступ 

   //Варіант 1 (складний)
   /*
   1. Ініціалізуємо перше завантаження (рядок кількість слайдів)
   2. Для каруселі задаємо ширину (100% * кількість слайдів)
   3. Вибудобуємо карусель в один рядок
   4. Назначаємо каруселі анімацію
   5. Приховуємо все що більше вікна показу слайда
   6. Кожному слайду (перебираючи) назначаємо ширину вікна через яке воно буде показуватись
   7. Відаємо обробник подій на стрілки вперед/назад
   8. Робимо умову, якщо offset дорівнює останьому слайду по ширині, то переводимо його на початок, якщо ні додаємо відступ в offset
   9. Двигаємо карусель по горизонталі беручи відступ з offset
   10. Робимо умову, якщо номер слайду добіг кінця, то повертаємо його на початок. Якщо ні то збільшуємо його на 1. Так само зі стрілкою назад, тільки зменшуємо на 1.
   11. Робимо коректне відображення поточного слайду

   *** Додаємо додатковий слайдер (крапки)
   1. Отримуємо весь блок слайдера (вікно, кнопки, лічильник)
   2. Створюємо пустий масив
   3. Задаємо через inline-style нашому всьому блоку позицію relative (щоб розмістити кнопки)
   4. Створюємо новий елемент (оболонка) для нашого міні-слайдера (тип - список ol)
   5. Додаємо до нього inline-style
   6. Апендимо його в наш головний блок
   7. За допомогою циклу створюємо наші крапки
   8. Створюємо елемент крапки (тип - елемент списку li)
   9. Додаємо атрибут до кожного елементу списку (назва атрибуту, значення)
   10. Додаємо inline-style для наших крапок
   11. Якщо це перший елемент - то ми прибираємо непрозрачність (начебто вибрано перший слайд в каруселі)
   12. Пушимо всі наші крапки в масив
   13. Апендимо наші крапки в оболонку міні-слайдера
   14. Коли натискаємо стрілки назад/вперед - то перебираємо наш масив з крапками, робимо всі напівпрозорі, а одну крапку непрозору
   15. Перебираємо масив з крапками
   16. Навішуємо клік
   17. Отримуємо по атрибуту кожний елемент списку (його номер)
   18. Присвоюємо цей номер - номеру слайда який повинен показатись
   19. Здвигаємо слайд на задану відстань
   20. Змінюємо в лічильнику поточний номер слайду
   */

   // При початковому завантажені сторінки
   if (slide.length < 10) {
      total.textContent = `0${slide.length}`;
      current.textContent = `0${slideIndex}`;
   } else {
      total.textContent = slide.length;
      current.textContent = slideIndex;
   }

   slideInside.style.width = 100 * slide.length + '%';
   slideInside.style.display = 'flex';
   slideInside.style.transition = '0.5s all'
   slideWrapper.style.overflow = 'hidden';

   slide.forEach((slide) => {
      slide.style.width = width;
   })

   slider.style.position = 'relative';

   const indicators = document.createElement('ol');
   indicators.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
      `;

   slider.append(indicators);

   for (let i = 0; i < slide.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.style.cssText = `
         box-sizing: content-box;
         flex: 0 1 auto;
         width: 30px;
         height: 6px;
         margin-right: 3px;
         margin-left: 3px;
         cursor: pointer;
         background-color: #fff;
         background-clip: padding-box;
         border-top: 10px solid transparent;
         border-bottom: 10px solid transparent;
         opacity: .5;
         transition: opacity .6s ease;
         `
      if (i == 0) {
         dot.style.opacity = '1';
      }
      dotsArr.push(dot);
      indicators.append(dot);
   }

   const opacity = () => {
      dotsArr.forEach(dot => {
         dot.style.opacity = '.5';
      })
      dotsArr[slideIndex - 1].style.opacity = '1';
   }

   const delPx = (str) => {
      return +str.replace(/\D/ig, '');
   }

   next.addEventListener('click', () => {
      if (offset == delPx(width) * (slide.length - 1)) {
         offset = 0;
      } else {
         offset += delPx(width);
      }
      slideInside.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == slide.length) {
         slideIndex = 1;
      } else {
         slideIndex++;
      }

      if (slide.length < 10) {
         current.textContent = `0${slideIndex}`;
      } else {
         current.textContent = slideIndex;
      }
      opacity();

   })

   prev.addEventListener('click', () => {
      if (offset == 0) {
         offset = delPx(width) * (slide.length - 1);
      } else {
         offset -= delPx(width);
      }
      slideInside.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == 1) {
         slideIndex = slide.length;
      } else {
         slideIndex--;
      }

      if (slide.length < 10) {
         current.textContent = `0${slideIndex}`;
      } else {
         current.textContent = slideIndex;
      }
      opacity();
   });

   dotsArr.forEach(dot => {
      dot.addEventListener('click', (e) => {
         const slideTo = e.target.getAttribute('data-slide-to');
         slideIndex = slideTo;

         offset = delPx(width) * (slideTo - 1);

         slideInside.style.transform = `translateX(-${offset}px)`;

         if (slide.length < 10) {
            current.textContent = `0${slideIndex}`;
         } else {
            current.textContent = slideIndex;
         }

         opacity();
      })
   });

   //Варіант 2 (простий)
   /*
   1. Отримуємо всі елементи зі сторінки (слайди, кнопку назад/вперед, лічильник поточний, лічильник загальний)
   2. Створюємо лічильник слайда (початок з 1)
   3. Ствоюрємо функцію показу слайдів (showSlide)
   4. Виконуємо 2 перевірки (якщо номер слайду більший чим всього слайдів то переходимо на початок (1) / якщо номер слайду менший першого слайду переходимо в кінець (4))
   5. Перебираємо всі слайди та спочатку приховуємо всі слайди за допомогою класів
   6. Показуємо перший слайд (0) за допомогою класів
   6а. Створюємо умову для відображення всієї кількості слайдів
   7. Створюємо функцію (plusSlides) з номером слайду та викликаємо в ній функцію (showSlide)
   8. Навішуємо обробники подій на стрілки (назад/вперед) та викликаємо в них функцію (plusSlides) з аргументами -1 та 1
   9. Створюємо умову для поточного відображення номера слайду
   */

   //showSlide(slideIndex);

   //if (slide.length < 10) {
   //   total.textContent = `0${slide.length}`;
   //} else {
   //   total.textContent = slide.length;
   //}

   //function showSlide (n) {
   //   if (n > slide.length) {
   //      slideIndex = 1;
   //   }

   //   if (n < 1) {
   //      slideIndex = slide.length
   //   }

   //   slide.forEach((item) => {
   //      item.classList.add('hide')
   //      item.classList.remove('show');
   //   })

   //   slide[slideIndex - 1].classList.remove('hide')
   //   slide[slideIndex - 1].classList.add('show')

   //   if (slideIndex < 10) {
   //      current.textContent = `0${slideIndex}`;
   //   } else {
   //      current.textContent = slideIndex;
   //   }

   //}

   //function plusSlides (n) {
   //   showSlide(slideIndex += n)
   //}

   //prev.addEventListener('click', () => {
   //   plusSlides(-1)
   //})

   //next.addEventListener('click', () => {
   //   plusSlides(1)
   //})
}

//module.exports = slider;
export default slider;