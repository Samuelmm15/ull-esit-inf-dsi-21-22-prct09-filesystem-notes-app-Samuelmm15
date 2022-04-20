import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/note';
import {NoteCollection} from '../src/noteCollection';

const test: Note = new Note('Test', 'This is a test', 'red');
const test1: Note = new Note('Test1', 'This is the test1', 'yellow');
const testCollection = new NoteCollection([test, test1]);
describe('Class NoteCollection tests', () => {
  it('NoteCollection getListlenght() return 2', () => {
    expect(testCollection.getListlength()).to.be.equal(2);
  }),
  it('NoteCollection getNoteList() return [test, test1]', () => {
    expect(testCollection.getNoteList()).to.be.eqls([test, test1]);
  });
});
