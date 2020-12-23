      
      require('es6-promise').polyfill();
      import 'nodelist-foreach-polyfill';
      
      import tabs from './modules/tabs';
      import modal from './modules/modal';
      import calc from './modules/calc';
      import cards from './modules/cards';
      import forms from './modules/forms';
      import slider from './modules/slider';
      import timer from './modules/timer';
      import {openModal} from './modules/modal';

      window.addEventListener("DOMContentLoaded", () => {
            // Ставим таймер через какое время вызввть модальное окно на сайте

            const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 30000);
0
            tabs(".tabheader__item",".tabcontent",".tabheader__items",'tabheader__item_active');
            modal('[data-modal]', '.modal', modalTimerId);
            calc();
            cards();
            forms('form', modalTimerId);
            slider({
                  container: '.offer__slider',
                  nextArrow: '.offer__slider-next',
                  slide: '.offer__slide',
                  prevArrow: '.offer__slider-prev',
                  totalCounter: '#total',
                  currentCounter: '#current', 
                  wrapper: ".offer__slider-wrapper",
                  field: ".offer__slider-inner",
            });
            timer('.timer', '2020-12-31');
      });