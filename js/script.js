'use strict';
import calc from './modules/calc';
import form from './modules/form';
import menu from './modules/menu';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
   const openModalScroll = setTimeout(() => openModal('.modal', openModalScroll), 50000); // після завантаження сторінки через 3сек з'являється МВ
   calc();
   form('form', openModalScroll);
   menu();
   modal('[data-modal]', '.modal', openModalScroll);
   slider({
      containerSelector: '.offer__slider',
      slideSelector: '.offer__slide',
      prevSelector: '.offer__slider-prev',
      nextSelector: '.offer__slider-next',
      currentCounterSelector: '#current',
      totalCounterSelector: '#total',
      wrapperSelector: '.offer__slider-wrapper',
      insideSelector: '.offer__slider-inside'   
   });
   tabs('.tabcontent', '.tabheader__item', '.tabheader__items', 'tabheader__item_active');
   timer('.timer', '2025-01-31T15:00:00');

});