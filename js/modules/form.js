import { openModal, closeModal } from "./modal";
import { fetchReq } from "../services/services";

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
         fetchReq('http://localhost:3000/requests', json)
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
      openModal('.modal', openModalScroll);

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
         closeModal('.modal');
      }, 4000) 

   }
}

//module.exports = form;
export default form;