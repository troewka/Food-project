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
export default calc;