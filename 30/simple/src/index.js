'use strict';

import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import toglePopUp from './modules/toglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import team from './modules/team';
import calcValidate from './modules/calcValidate';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import validForm from './modules/validForm';

// timer 
countTimer('25 july 2020');
// меню
toggleMenu();
// popup
toglePopUp();
// табы 
tabs();
// слайдер 
slider();
// наша команда
team();
// валидация калькулятора
calcValidate();
// калькулятор
calc(100);
// send-ajax-form
sendForm(document.getElementById('form1'));
sendForm(document.getElementById('form2'));
sendForm(document.getElementById('form3'));
// валидация формы
validForm('#form1');
validForm('#form2');
validForm('#form3');