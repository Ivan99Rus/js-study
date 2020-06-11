let num = 266219,
  sum = 1;

let numStr = String(num);

for (let i = 0; i < numStr.length; i++) {
  sum *= numStr.split('')[i];
}

alert(String(sum**3).slice(0,2));
