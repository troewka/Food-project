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
export default modal;
export {openModal, closeModal};