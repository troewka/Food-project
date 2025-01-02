/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc () {
   //* Calculator
   /*
   1. Отримуємо елемент з кінцевим значенням
   2. Створюємо 5 змінних, щоб потім в них записувати значення (секція "стать", input (3), секція "активність")
   3. Створюємо першу функцію по підрахунку формул (загальне значення)
   3.1. Перевіряємо чи заповненні всі поля, якщо ні - видаємо помилку та виходимо з функції
   3.2. Якщо всі поля заповнені, то від типу статі рахуємо формулу
   3.3. Запускаємо функцію (вона нічого не повертає тільки рахує)
   4. Створюємо функцію по отриманню даних з статичних елементів (плашок sex, ratio)
   4.1 Передаємо два аргументи (батьківський селектор, та клас активності плашки)
   4.2 Отримуємо всі div з відповідних батьківських селекторів
   4.3 Навішуємо обробник подій на батьківські селектори (делегування події), з об'єктом події на який саме зробили клік
   4.4 Перевіряємо чи при кліці на вказаний елемент він містить даний клас
   4.5. Якщо так - далі перевіряємо чи містить вказаний елемент вказаний атрибут
   4.6 Якщо так - записуємо в нашу зміну цей атрибут (попередньо переводячи його в число) для секції активність
   4.7 Якщо ні - записуємо в зміну селектор id (для секції стать)
   4.8 Перебираємо всі елементи та прибираємо у всіх клас активності
   4.9 Додаємо клас активності на елемент який клікнули
   4.10 Запускаємо попередню функцію (для оновлення даних)
   4.11 Викликаємо функцію 2 раза з класаи активності та різними батьківськими селекторами 
   5. Створюємо функцію по отриманню значення з input
   5.1 Передаємо аргумент (id)
   5.2. Отримуємо всі input зі сторінки
   5.3 Навіушуємо на них обробник подій
   5.4 Перевіряємо умовою, якщо атрибут містить відповідний id то записуємо його в змінну
   5.5 Викликаємо першу функцію
   5.6 Викликаємо функцію 3 рази з різними селекторами (id)
   6. Якщо користувач в input вводить не числове значення, робимо перевірку за допомогою регулярного виразу, якщо в полі вводу є НЕ число - підсвічуємо це поле червоним
   7. При кліку на плашки (стать/активність) записуємо в LocalStorage їхні значення
   8. При першому заході на сайт робимо перевірку, якщо в LocalStorage є такий ключ то записуємо його значення в змінну, якщо ні - записуємо значення в змінну вручну, і також в LocalStorage
   9. Створюємо функцію інізіалізація (при першому заході на сайт), передаємо в аргументи селектор та клас активності
   9.1 Отримуємо елемент зі сторінки
   9.2 Робимо перебір всіх елементів
   9.3 Видаляємо у всіх елементів (плашок) клас активності
   9.4 Перевіряємо кожен елемент за допомогою умови, якщо елемент має атрибут і цей атрибут має відповідну назву яка записана в LocalStorage - то додаємо до цього елементу клас активності
   9.5 Викликаємо функцію з відповідними селекторами
   */

   const result = document.querySelector('.calculating__result span');
   let sex, height, weight, age, ratio;

   if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
   } else {
      sex = 'male';
      localStorage.setItem('sex', 'male')
   }

   if (localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
   } else {
      ratio = 1.725;
      localStorage.setItem('ratio', 1.725);
   }

   const initLocalInf = (selector, classActive) => {
      const element = document.querySelectorAll(selector);

      element.forEach(elem => {
         elem.classList.remove(classActive);
         if (elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(classActive);
         }
         if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(classActive);
         }
      })
   }
   initLocalInf('#gender div', 'calculating__choose-item_active');
   initLocalInf('.calculating__choose_big div', 'calculating__choose-item_active');

   const totalCal = () => {
      if (!sex || !height || !weight || !age || !ratio) {
         result.textContent = 'Not value';
         return;
      }

      if (sex == 'male') {
         result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio));
      } else {
         result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio));
      }
   }
   totalCal();

   const getStaticItem = (parentSelector, classActive) => {
      const elements = document.querySelectorAll(`${parentSelector} div`);

      document.querySelector(parentSelector).addEventListener('click', (e) => {
         const target = e.target;
         if (target.classList.contains('calculating__choose-item')) {
            if (e.target.getAttribute('data-ratio')) {
               ratio = +e.target.getAttribute('data-ratio')
               localStorage.setItem('ratio', ratio);
            } else {
               sex = e.target.getAttribute('id');
               localStorage.setItem('sex', sex);
            }
      
            elements.forEach(item => {
               item.classList.remove(classActive);
            })
            e.target.classList.add(classActive);
            totalCal();
         }
      });
   }
   getStaticItem('#gender', 'calculating__choose-item_active')
   getStaticItem('.calculating__choose_big', 'calculating__choose-item_active')

   const getInputValue = (selector) => {
      const input = document.querySelector(selector);

      input.addEventListener('input', () => {
         if (input.value.match(/\D/g)) {
            input.style.border = '1px solid red';
         } else {
            input.style.border = 'none';
         }
         switch(input.getAttribute('id')) {
            case 'height':
               height = input.value;
               break;
            case 'weight':
               weight = input.value;
               break;
            case 'age':
               age = input.value;
               break;
         }
         totalCal();
      })

   }
   getInputValue('#height');
   getInputValue('#weight');
   getInputValue('#age');
}

//module.exports = calc;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form (formSelector, openModalScroll) {
   //* Form (AJAX (XMLHttpRequest + FormData (або JSON))

   const form = document.querySelectorAll(formSelector); // отримуємо всі форми на сторінці
   const messages = { // база повідомлень
      load: 'icons/spinner.svg',
      success: 'Дані відправлено, чекайте дзвінка',
      fail: 'Трапилась помилка'
   }

   function postData (form) {
      form.addEventListener('submit', (event) => { // на форму навішуємо слухач з типом відправка
         event.preventDefault(); // відміняємо перезавантаження сторінки

         const loadMessages = document.createElement('img'); // створюємоновий елемент
         loadMessages.src = messages.load; // в нього кладемо повідомлення з бази
         loadMessages.classList.add('load'); // додаємо клас
         form.insertAdjacentElement('afterend', loadMessages); //пушимо в верстку (після форми) 

         const data = new FormData(form); // створюємо збирач з форм а саме з input (замість витягування кожного value). У верстці в input обов'язково повинент бути атрибут name

         //*XMLHttpRequest
         //const request = new XMLHttpRequest(); // створюємо новий запит
         //request.open('POST', 'server.php'); // вказуємо HTTP метод та адресу серверу
         //request.setRequestHeader('Content-type', 'application/json'); // якщо відправляти FormData заголовок не потрібний

         // Якщо відправляти в JSON форматі:
         //const obj = {}; // створюємо пустий об'єкт
         //data.forEach(function (value, key) { // перибираємо FormDate
         //   obj[key] = value; // записуємо в об'єкт ключ - значення
         //})
         //const res = JSON.stringify(obj); // переводимо об'єкт в JSON формат
         const json = JSON.stringify(Object.fromEntries(data.entries()))
         
         //console.log(data);
         //request.send(res); // відправляємо запит (для XMLHttpRequest)

         //* Fetch
         // відправка даних за допомогою FormData
         //fetch('server.php', { // запит на сервер
         //   method: 'POST',
         //   body: data
         //відправка даних за допомогою JSON
         //   body: res 
         //   headers: {
         //      'Content-type': 'application/json'
         //   }
         //})
         //.then((responsData) => { 
         //   return responsData.text(); // переформатовуємо в текст нашу відповідь від серверу
         //})
         ;(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.fetchReq)('http://localhost:3000/requests', json)
         .then((responsData) => {
               console.log(responsData);
               thanksModal(messages.success);
               loadMessages.remove();
         }).catch(() => {
            thanksModal(messages.fail);
         }).finally(() => {
            form.reset(); // очищаємо всі елементи форми
         })
      
         //request.addEventListener('load', () => { // вішаємо слухач на наш запит
         //   if (request.status === 200) { // якщо запит успішний
         //      console.log(request.response);
         //      thanksModal(messages.success);
         //      mess.textContent = messages.success; // виводимо повідомлення з бази
         //      form.reset(); // очищаємо всі елементи форми
         //      setTimeout(() => { // запускаємо таймер по видаленню повідомлення
         //         mess.remove();
         //      }, 2000)
         //      loadMessages.remove();
         //   } else {
         //      thanksModal(messages.fail);
         //   }
         //})

      })
   }
   form.forEach(item => { // перибираємо всі форми
      postData(item); // та запускаємо функцію з цією формою
   })

   /* Створюєм функцію по показу модального вікна з відповідним повідомленням
   1. Отримуємо елементи зі сторінки
   2. Приховуємо початкове модальне вікно з формою (.modal_dialog)
   3. Запускаємо функцію openModal яка показує підложку МВ (.modal)
   4. Створюємо динамічний елемент в середині JS (messagesModal)
   5. Додаємо до нього клас з початкогово МВ (де була форма)
   6. Створюємо нову версту (така як була в початковому МВ), підставляючи в нього відповідне повідомлення
   7. Апендимо його в верстку, в кінець елементу (.modal)
   8. Створюємо таймер, який через 4сек після виклику функції thanksModal - а) Видаляє динамічний елемент (messagesModal) б) Приховуємо початкове МВ
   9. Закриваємо підложку МВ (.modal)
   10. Запускаємо функцію thankModal в функції postData (після успішного відправлення даних на сервер)

   */
   function thanksModal (messages) {
      const preDialog = document.querySelector('.modal__dialog');
      const modal = document.querySelector('.modal');

      preDialog.classList.add('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', openModalScroll);

      const messagesModal = document.createElement('div');
      messagesModal.classList.add('modal__dialog');
      messagesModal.innerHTML = `
         <div class="modal__content">
            <div class="modal__close">&times;</div>
            <div class="modal__title">${messages}</div>
         </div>
      `;
      modal.append(messagesModal);

      setTimeout(() => {
         messagesModal.remove();
         preDialog.classList.remove('hide');
         (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
      }, 4000) 

   }
}

//module.exports = form;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function menu () {
   //* Menu (карточки)
   /*
   1. Створюємо класс (конструктор) та заносимо змінні (як в об'єкті ключ - значення), які будемо використовувати далі за допомогою переданих аргументів;
   2. Створюємо в середині конструктора метод render;
   3. Створюємо в ньому елемент (div) куди помістимо нашу версту за допомогою innerHTML;
   4. Підставляємо з нашого конструктора потрібні змінні у DOM дерево;
   5. В батьківський елемент пушимо наш новий створений div з версткою в середині;
   6. Створюємо допоміжний метод для конвертування валют та визиваємо його прямо в конструкторі;
   7. Створюємо екземпляр класу куди передаємо всі аргументи які приймає конструктор;
   8. Викликаємо метод render;
   9. Використовуємо оператор Rest;
   10. Передаємо в конструктор декілька даних, але аргументів в функції менше чим ми передаємо (classes). Всі залишкові аргументи збираються в масив;
   11. Перебираємо масив та додаємо до нашого створеного елемету div класи;
   12. Робимо перевірку, якщо залишкових аргументів нема (0), то присвоюємо дефолтне значення
   */
   class Menu {
      constructor(img, alt, subtitle, descr, price, parentSelector, ...classes) {
         this.image = img;
         this.alt = alt;
         this.subtitle = subtitle;
         this.descr = descr;
         this.price = price;
         this.classes = classes; // тут приходить масив
         this.parent = document.querySelector(parentSelector);
         this.uah = 41;
         this.converterUAH();
      }

      converterUAH() {
         this.price = this.price * this.uah;
      }

      render() {
         const div = document.createElement('div');
         
         if (this.classes.length === 0) {
            this.classes = 'menu__item'; // змінна мала тип даних масив = перезаписали її в строчку
            div.classList.add(this.classes);
         } else {
            this.classes.forEach((classElem) => {
               div.classList.add(classElem);
            })
         }

         div.innerHTML = `
            <img src=${this.image} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
               <div class="menu__item-cost">Цена:</div>
               <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
         `
         this.parent.append(div);
      }
   }

   /*
   1. Стврюємо функцію (отримання даних з серверу). Робимо функцію асинхроною та розставляємо флаги async/await
   2. Створюємо запит GET (вказуємо url сервера)
   3. Отримуємо дані з сервера
   3а. Якщо запит - помилка, виводимо повідомлення
   4. Переводимо дані з JSON формату
   5. Викликаємо функцію з URL сервера
   6. Fetch запит повертає Promise
   7. Обробляємо Promise за допомогою then
   8. Дані в форматі масив з об'єктами
   9. Перебираємо масив за допомогою ForEach
   10. Кожен елемент в масиві зразу (а це об'єкт з даними) деструктурезуємо
   11. Створюємо новий конструктор карточки куди передаємо наші деструктеризовані елементи які прийшли з сервера
   12. Запускаємо метод рендер (формує самі картки в HTML) з нашого шаблона класів 
   */

   // 3 варіанти створення карток

   //Варіант №1 (за допомогою класів(шаблону) динамічно) 

   (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.fetchGet)('http://localhost:3000/menu')
   .then((data) => {
      data.forEach(({img, altimg, title, descr, price}) => {
         new Menu(img, altimg, title, descr, price, '.menu .container').render();
      })
   })

   //Варіант №2 (створює картки без шаблону, динамічно)

   //fetchGet('http://localhost:3000/menu')
   //   .then(data => createCard(data))

   //const createCard = (data) => {
   //   data.forEach(({img, altimg, title, descr, price}) => {
   //      const element = document.createElement('div');
   //      element.classList.add('menu__item');
   //      element.innerHTML = `
   //         <img src=${img} alt=${altimg}>
   //         <h3 class="menu__item-subtitle">${title}</h3>
   //         <div class="menu__item-descr">${descr}</div>
   //         <div class="menu__item-divider"></div>
   //         <div class="menu__item-price">
   //            <div class="menu__item-cost">Цена:</div>
   //            <div class="menu__item-total"><span>${price}</span> грн/день</div>
   //         </div>
   //      `
   //   document.querySelector('.menu .container').append(element);
   //   })
   //};

   //Варіант №3 (створює картки за допомогою класів (шаблону), вручну)

   //const menuFintes = new Menu(
   //   "img/tabs/vegy.jpg",
   //   "vegy",
   //   "Меню 'Фитнес'",
   //   "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
   //   8,
   //   '.menu .container'
   //);

   //const menuPremium = new Menu(
   //   "img/tabs/elite.jpg",
   //   "elite",
   //   "Меню 'Премиум'",
   //   "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
   //   10,
   //   '.menu .container',
   //   'menu__item',
   //   'block'
   //);

   //const menuLenges = new Menu(
   //   "img/tabs/post.jpg",
   //   "post",
   //   "Меню 'Постное'",
   //   "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
   //   7,
   //   '.menu .container',
   //   'menu__item',
   //   'block'
   //);

   //menuFintes.render();
   //menuPremium.render();
   //menuLenges.render();
}

//module.exports = menu;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal (modalSelector, openModalScroll) { // функцію по відкриттю МВ
   const modal = document.querySelector(modalSelector); // підготовлене модальне вікно (МВ)
   modal.classList.add('show') // додаємо клас
   modal.classList.remove('hide') // видаляємо клас
   if (openModalScroll) {
      clearTimeout(openModalScroll); // після відкриття модального вікна очищуємо setTimeout
   }

}; 

function closeModal (modalSelector) { // функція по закриттю МВ
   const modal = document.querySelector(modalSelector); // підготовлене модальне вікно (МВ)
   modal.classList.add('hide'); // додаємо клас
   modal.classList.remove('show'); // видаляємо клас
};

function modal (triggerSelector, modalSelector, openModalScroll) {
   //* Modal window

   const btn = document.querySelectorAll(triggerSelector), // кнопки на які буде тригер
         modal = document.querySelector(modalSelector); // підготовлене модальне вікно (МВ)
   //modalClose = document.querySelector('.modal__close'); // кнопка закриття МВ

   btn.forEach((item) => { // перебираємо кнопки на якій спрацював тригер
      item.addEventListener('click', () => openModal(modalSelector, openModalScroll))// вішаємо слухач на ту саме кнопку на яку 
   })

   //modalClose.addEventListener('click', closeModal) // навішуємо слухач на кнопку закриття

   modal.addEventListener('click', (event) => { // навішуємо слухач саме МВ
      const target = event.target
      console.dir(target);
      if (event.target == modal || event.target.className == 'modal__close') { // якщо натискаємо на підложку (будь-яке місце) або на елемент, який має класс
      closeModal(modalSelector); // закриваємо МВ
      }
   });

   document.addEventListener('keydown', (event) => { // навішуємо слухач з типом keydown на весь докуент
      if (event.code == 'Escape' && modal.classList.contains('show')) { // якщо МВ відкрите та натиснута клавіша Esc
      closeModal(modalSelector);
      }
   });

   window.addEventListener('scroll', () => { // наішуємо слухач p типом скрол на загальне вікно 
      if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // якщо скільки проскролено + висота вікна юзера == вся висото скрола на сторінці - то показуємо МВ (тобто прокрутили до кінця сторінки)
      openModal(modalSelector, openModalScroll);
      }
   })
}

//module.exports = modal;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs (tabContentSelector, tabItemSelector, tabParentsSelector, activeClass) {
   //* Tabs   

   const tabContent = document.querySelectorAll(tabContentSelector),
         tabItem = document.querySelectorAll(tabItemSelector),
         tabParents = document.querySelector(tabParentsSelector);

   const hideTabContent = () => {
      tabContent.forEach((item) => {
         item.classList.add('hide');
         item.classList.remove('show')
      })
      tabItem.forEach(item => {
         item.classList.remove(activeClass);
      })
   }

   const showTabContent = (i = 0) => {
      tabContent[i].classList.add('show');
      tabContent[i].classList.remove('hide');
      tabItem[i].classList.add(activeClass);
   }

   hideTabContent();
   showTabContent();

   tabParents.addEventListener('click', (event) => {
      const target = event.target;
      tabItem.forEach((item, i) => {
         if (target === item) {
            hideTabContent();
            showTabContent(i);
            console.log(target);
            console.log(item);
            console.log(item === target);
         }
      })
   })
}

//module.exports = tabs;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchGet: () => (/* binding */ fetchGet),
/* harmony export */   fetchReq: () => (/* binding */ fetchReq)
/* harmony export */ });
   // Створюємо POST запит
   const fetchReq = async (url, data) => { // виносино запит на сервер в окрему функцію
      const res = await fetch(url, { // запит на сервер
         method: 'POST',
         body: data, 
         headers: {
            'Content-type': 'application/json'
         }
      })
      return await res.json();
   }

   const fetchGet = async (url) => { // виносино запит на сервер в окрему функцію
      const res = await fetch(url);
      if(!res.ok) {
         throw new Error(`Could fetch to ${url}, status: ${res.status}`)
      }
      return await res.json();
   }

   
   

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/menu */ "./js/modules/menu.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");










window.addEventListener('DOMContentLoaded', () => {
   const openModalScroll = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', openModalScroll), 50000); // після завантаження сторінки через 3сек з'являється МВ
   (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
   (0,_modules_form__WEBPACK_IMPORTED_MODULE_1__["default"])('form', openModalScroll);
   (0,_modules_menu__WEBPACK_IMPORTED_MODULE_2__["default"])();
   (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', openModalScroll);
   (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
      containerSelector: '.offer__slider',
      slideSelector: '.offer__slide',
      prevSelector: '.offer__slider-prev',
      nextSelector: '.offer__slider-next',
      currentCounterSelector: '#current',
      totalCounterSelector: '#total',
      wrapperSelector: '.offer__slider-wrapper',
      insideSelector: '.offer__slider-inside'   
   });
   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabcontent', '.tabheader__item', '.tabheader__items', 'tabheader__item_active');
   (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2025-01-31T15:00:00');

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map