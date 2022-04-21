/* eslint-disable prefer-const */
import {templateMethodAlgorithm} from './templateMethod';

/**
 * This is the add operation class
 */
export class AddOperation extends templateMethodAlgorithm {
  /**
     * This is the constructor of the class
     * @param numberList Consists in the list to use
     * @param firstFunction This is the first function
     * @param secondFunction This is the second function
     */
  constructor(numberList: number[], firstFunction: Function, secondFunction: Function) {
    super(numberList, firstFunction, secondFunction);
  }
  /**
   * This is the reduce operation
   * @returns The final number
   */
  reduceOperation(): number {
    let result: number = 0;
    let numberListResult: number[] = this.run(); // First the aplication of the base algorithm
    numberListResult.forEach((item) => {
      result = result + item;
    });
    return result;
  }
}
