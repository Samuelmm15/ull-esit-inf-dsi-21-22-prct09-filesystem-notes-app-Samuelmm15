import {writeFile} from 'fs';
import {readFile} from 'fs';
import chalk from 'chalk';

// type Colour = 'red' | 'green' | 'blue' | 'yellow';

export class Note {
  constructor(private title: string, private body: string,
    private colour: string, private userName: string) {
  }
  getTitle(): string {
    return this.title;
  }
  getBody(): string {
    return this.body;
  }
  getColour(): string {
    return this.colour;
  }
  getUserName(): string {
    return this.userName;
  }
  writeNote(): void {
    writeFile(`src/notes/${this.userName}/${this.title}.txt`, this.body, (err) => {
      if (err) {
        console.log(chalk.red('There must be a problem to write the file'));
      } else {
        console.log(chalk.green('The file was succesfully created'));
      }
    });
  }
  readNote(): void {
    readFile(`src/notes/${this.userName}/${this.title}.txt`, (err, data) => {
      if (err) {
        console.log(chalk.red('There must be a problem to read'));
      } else {
        console.log(data.toString());
      }
    });
  }
}
