import {Note} from './note';
import {NoteCollection} from './noteCollection';

const test: Note = new Note('Test', 'This is the test', 'red');
test.writeNote();
const test1: Note = new Note('Test1', 'This is the test1', 'yellow');
test1.writeNote();
const test2: Note = new Note('Test2', 'This is the test2', 'blue');
test2.writeNote();

const testCollection: NoteCollection = new NoteCollection([test, test1, test2]);
const test3: Note = new Note('Test3', 'This is the test3', 'green');
test3.writeNote();
// testCollection.addNewNote(test3);
// testCollection.getListPosition(3).readNote();
testCollection.getTitleList();
// testCollection.modifyNote('Test3', 'Hola esto es una prueba de modificación');
// testCollection.modifyNote('test4', '');
// testCollection.readXNote('test');
testCollection.deleteNote('Test2');
testCollection.getTitleList();
