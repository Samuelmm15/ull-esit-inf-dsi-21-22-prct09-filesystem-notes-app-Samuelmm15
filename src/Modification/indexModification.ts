import {AddOperation} from './addOperation';
import {SubOperation} from './subOperation';

const test = new AddOperation([1, 2, 3, 4, 7, 20], (x: number) => {
  if (x < 10) {
    return true;
  } else {
    return false;
  }
}, (x: number) => {
  return x * x;
});
console.log(test.reduceOperation());

const test1 = new SubOperation([1, 2, 3, 4, 7, 20], (x: number) => {
  if (x < 10) {
    return true;
  } else {
    return false;
  }
}, (x: number) => {
  return x * x;
});
console.log(test1.reduceOperation());

