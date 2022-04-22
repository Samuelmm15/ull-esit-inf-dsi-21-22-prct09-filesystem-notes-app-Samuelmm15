/* eslint-disable no-unused-vars */
import yargs from 'yargs';
import {Note} from './note';
import chalk from 'chalk';
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
      const object = new Note(argv.title, argv.body, argv.colour, argv.user);
      fs.readdir(`src/notes/${argv.user}`, (err, data) => {
        if (err) {
          console.log(chalk.red('There must be a problem'));
        } else {
          let flag: boolean = true;
          data.forEach((item) => {
            if (item === `${argv.title}.json`) {
              flag = true;
            } else {
              flag = false;
            }
          });
          if (flag === true) {
            console.log(chalk.red('The file that is trying to add already exists'));
          } else {
            fs.writeFile(`src/notes/${argv.user}/${argv.title}.json`, JSON.stringify(object), (err) => {
              if (err) {
                console.log(chalk.red('There must be a problem to write the file'));
              } else {
                console.log(chalk.green('The file was succesfully created'));
              }
            });
          }
        }
      });
    }
  },
});

yargs.command({ // Este funciona pero falta por colores
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
      fs.readdir(`src/notes/${argv.user}`, (err, data) => {
        let flag: boolean = true;
        data.forEach((item) => {
          if (item === `${argv.title}.json`) {
            flag = true;
            fs.readFile(`src/notes/${argv.user}/${argv.title}.json`, (err, readData) => {
              if (err) {
                console.log(chalk.red('There must be a problem to read'));
              } else {
                const object = JSON.parse(readData.toString());
                console.log(object.body);
              }
            });
          } else {
            flag = false;
          }
        });
        if (flag !== true) {
          console.log(chalk.red('The file that was trying to read does not exists'));
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
      fs.unlink(`src/notes/${argv.user}/${argv.title}.json`, (err) => {
        if (err) {
          console.log(chalk.red('There must be a problem to remove'));
        } else {
          console.log(chalk.green('The note was succefully removed'));
        }
      });
    }
  },
});

yargs.command({ // ESTO FUNCIONA
  command: 'modify',
  describe: 'Modify an exist Title',
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
    body: {
      describe: 'Body Note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.user === 'string') && (typeof argv.title === 'string') && (typeof argv.body === 'string')) {
      let flag: boolean = true;
      fs.readdir(`src/notes/${argv.user}`, (err, data) => {
        if (err) {
          console.log(chalk.red('There must be a problem'));
        } else {
          data.forEach((item) => {
            if (item === `${argv.title}.json`) {
              flag = true;
              fs.readFile(`src/notes/${argv.user}/${argv.title}.json`, (err, readData) => {
                if (err) {
                  console.log(chalk.red('There must be a problem to read'));
                } else {
                  const object = JSON.parse(readData.toString());
                  object.body = `${argv.body}`;
                  fs.writeFile(`src/notes/${argv.user}/${argv.title}.json`, JSON.stringify(object), (err) => {
                    if (err) {
                      console.log(chalk.red('There must be a problem to write the file'));
                    } else {
                      console.log(chalk.green('The file was succesfully Modificated'));
                    }
                  });
                }
              });
            } else {
              flag = false;
            }
          });
          if (flag !== true) {
            console.log(chalk.red('The file does not exists'));
          }
        }
      });
    }
  },
});

// FALTA COMANDO PARA AÑADIR NUEVOS USUARIOS

yargs.parse();
