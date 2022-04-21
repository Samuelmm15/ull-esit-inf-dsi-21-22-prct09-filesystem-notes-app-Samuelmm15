import 'mocha';
import {expect} from 'chai';
import {AddOperation} from '../src/Modification/addOperation';

const test = new AddOperation([1, 2, 3, 4, 7, 20], (x: number) => {
  if (x < 10) {
    return true;
  } else {
    return false;
  }
}, (x: number) => {
  return x * x;
});
describe('Class AddOperation tests', () => {
  it('test reduceOperation() return 17', () => {
    expect(test.reduceOperation()).to.be.equal(17);
  });
});

const test1 = new AddOperation([1, 3, 9, 50, 60, 20], (x: number) => {
  if (x < 10) {
    return true;
  } else {
    return false;
  }
}, (x: number) => {
  return x * x;
});
describe('Class AddOperation tests', () => {
  it('test reduceOperation() return 17', () => {
    expect(test1.reduceOperation()).to.be.equal(13);
  });
});
