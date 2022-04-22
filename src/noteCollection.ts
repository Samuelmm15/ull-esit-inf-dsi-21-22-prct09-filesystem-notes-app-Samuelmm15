import {Note} from './note';
import {writeFile} from 'fs';
import {readFile} from 'fs';
import chalk from 'chalk';

export class NoteCollection {
  constructor(private noteList: Note[]) {
  }
  getNoteList(): Note[] {
    return this.noteList;
  }
  getListPosition(position: number): Note {
    return this.noteList[position];
  }
  getListlength(): number {
    return this.noteList.length;
  }
  addNewNote(newNote: Note): void {
    this.noteList.forEach((item) => {
      if (item.getTitle() === newNote.getTitle()) {
        console.log(chalk.red('The Note that you are gonna to add already exists'));
      } else {
        this.noteList.push(newNote);
      }
    });
  }
  getTitleList(): void {
    this.noteList.forEach((item) => {
      console.log(item.getTitle());
    });
  }
  modifyNote(noteTitle: string, newBody: string): void {
    this.noteList.forEach((item) => {
      if (item.getTitle() === noteTitle) {
        writeFile(`src/notes/${item.getUserName()}/${item.getTitle()}.txt`, newBody, (err) => {
          if (err) {
            console.log(chalk.red('There must be a problem to write the file'));
          } else {
            console.log(chalk.green('The file was succesfully created'));
          }
        });
      } else {
        console.log(chalk.red('The note you are trying to modify does not exist'));
      }
    });
  }
  readXNote(noteTiTle: string): void { // FALTA IMPRIMIR CADA TÍTULO CON SU RESPECTIVO COLOR
    this.noteList.forEach((item) => {
      if (item.getTitle() === noteTiTle) {
        readFile(`src/notes/${item.getUserName()}/${item.getTitle()}.txt`, (err, data) => {
          if (err) {
            console.log(chalk.red('There must be a problem to read'));
          } else {
            console.log(data.toString());
          }
        });
      }
    });
  }
  deleteNote(noteTitle: string): void {
    let counter = 0;
    this.noteList.forEach((item) => {
      if (item.getTitle() === noteTitle) {
        this.noteList.splice(counter, 1);
        console.log(chalk.green(`The ${noteTitle} note was succefully deleted`));
      }
      counter++;
    });
  }
}
