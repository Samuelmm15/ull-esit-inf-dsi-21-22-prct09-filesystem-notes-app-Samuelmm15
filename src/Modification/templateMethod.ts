/* eslint-disable prefer-const */
/**
 * This class implements the Template Metoth
 */
export abstract class templateMethodAlgorithm {
  /**
   * This is the constructor of the class
   * @param numberList Consists in the list of numbers to reduce
   * @param firstFunction This is the first function for the filter Operation
   * @param secondFunction This is the second function for the map Operation
   */
  constructor(private numberList: number[], private firstFunction: Function,
    private secondFunction: Function) {
  }
  /**
   * This is the run method to execute the schema of the algorithm
   * @returns The final number list
   */
  public run(): number[] { // This is the schema of the algorithm
    this.filterOperation(this.firstFunction); // this are the basic operation for the algorithm
    this.mapOperation(this.secondFunction);
    return this.numberList;
  }
  /**
   * This is the filter Operation
   * @param logicalFuncion This is the logical function to use
   * @returns The result array
   */
  protected filterOperation(logicalFuncion: Function): number[] { // This is the default use
    let result: number[] = [];
    this.numberList.forEach((item) => {
      if (logicalFuncion(item) === true) {
        result.push(item);
      }
    });
    this.numberList = []; // This is to use for the mapOperation()
    this.numberList = result;
    // console.log(result);
    return result;
  }
  /**
   * This is the map operation
   * @param logicalFuncion This is the function to use
   * @returns The number list array result
   */
  protected mapOperation(logicalFuncion: Function): number[] { // This is the default use
    let result: number[] = [];
    this.numberList.forEach((item) => {
      result.push(logicalFuncion(item));
    });
    // console.log(result);
    return result;
  }
  /**
   * This is the abstract reduce operation
   */
  protected abstract reduceOperation(): number; // This could be implemented by subclasses
}
