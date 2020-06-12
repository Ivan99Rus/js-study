"use strict";


//part 1

let part1 = () => {
  let arr = ['24542', '56484645', '321021168', '8484616', '154151568', '101324864', '48465154'];
  
  arr.forEach((item) => {
    item[0] === '2' || item[0] === '4' ? console.log(item) : {};
  });
};



// part 2

let primeList = [];

let prime = (number) => {
  for (let k = 2; k < number; k++) {
    if (number % k === 0) {
      return false;
    } 
  }
  return true;
};

let part2 = () => {
  for (let i = 2; i < 4; i++) {
    primeList.push(i);
    //console.log(`Делители числа ${i}: 1, ${i}`);
  }

  for (let j = 5; j < 100; j++) {
    if (prime(j)) {
      primeList.push(j);
      console.log(`Делители числа ${j}: 1, ${j}`);
    }
  }
  console.log(`Все простые числа: ${primeList}`);
};

part1();
//part2();