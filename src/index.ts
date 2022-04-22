import yargs from 'yargs';
// import {Note} from './note';
import chalk from 'chalk';
// import {NoteCollection} from './noteCollection';
import * as fs from 'fs';

// type Colour = 'red' | 'green' | 'blue' | 'yellow';

yargs.command({ // Este Funciona
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    user: {
      describe: 'User Name',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Body Note',
      demandOption: true,
      type: 'string',
    },
    colour: {
      describe: 'Colour Note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.title === 'string') &&
      (typeof argv.user === 'string') &&
        (typeof argv.body === 'string') &&
          (typeof argv.colour === 'string')) {
    //   const object = new Note(argv.title, argv.body, argv.colour, argv.user);
    //   object.writeNote();
    //   objectCollection.addNewNote(object);
      fs.writeFile(`src/notes/${argv.user}/${argv.title}.txt`, argv.body, (err) => {
        if (err) {
          console.log(chalk.red('There must be a problem to write the file'));
        } else {
          console.log(chalk.green('The file was succesfully created'));
        }
      });
    }
  },
});

yargs.command({
  command: 'list',
  describe: 'List user title',
  builder: {
    user: {
      describe: 'User Name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      fs.readdir(`src/notes/${argv.user}`, (err, data) => {
        if (err) {
          console.log('There must be a problem');
        } else {
          data.forEach((item) => {
            console.log(item);
          });
        }
      });
    }
  },
});

yargs.command({ // ESTE FUNCIONA
  command: 'read',
  describe: 'Read user title',
  builder: {
    user: {
      describe: 'User Name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Title Note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.user === 'string') &&
      (typeof argv.title === 'string')) {
      fs.readFile(`src/notes/${argv.user}/${argv.title}.txt`, (err, data) => {
        if (err) {
          console.log(chalk.red('There must be a problem to read'));
        } else {
          console.log(data.toString());
        }
      });
    }
  },
});

yargs.command({ // ESTE FUNCIONA
  command: 'remove',
  describe: 'Remove user Title',
  builer: {
    user: {
      describe: 'User Name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Title Note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.user === 'string') &&
      (typeof argv.title === 'string')) {
      fs.unlink(`src/notes/${argv.user}/${argv.title}.txt`, (err) => {
        if (err) {
          console.log(chalk.red('There must be a problem to read'));
        } else {
          console.log(chalk.green('The note was succefully removed'));
        }
      });
    }
  },
});


yargs.parse();
