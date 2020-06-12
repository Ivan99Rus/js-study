"use strict";

let foo = function(e) {
  if ((typeof e) !== 'string') {
    alert(e + ' не строка!');
    return;
  }
  e = e.trim();

  return e.length > 30 ? e.slice(0, -e.slice(30).length) + '...' : e;
};

console.log(foo('1234567890123456789012345678901234567890'));