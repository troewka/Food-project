import { fetchGet } from "../services/services";

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

   fetchGet('http://localhost:3000/menu')
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
export default menu;