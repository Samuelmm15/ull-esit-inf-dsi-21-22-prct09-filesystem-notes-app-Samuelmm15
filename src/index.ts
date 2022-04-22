import yargs from 'yargs';
import {Note} from './note';
import chalk from 'chalk';
import * as fs from 'fs';

yargs.command({
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
          let flag: boolean = false;
          data.forEach((item) => {
            if (item === `${argv.title}.json`) {
              flag = true;
            } else {
              flag = false;
            }
          });
          if (flag !== false) {
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
          console.log(chalk.red('There must be a problem'));
        } else {
          if (data.length > 0) {
            console.log(chalk.grey('Files List: '));
            data.forEach((item) => {
              fs.readFile(`src/notes/${argv.user}/${item}`, (err, readData) => {
                if (err) {
                  console.log(chalk.red('There must be a problem to read'));
                } else {
                  const object = JSON.parse(readData.toString());
                  switch (object.colour) {
                    case 'red':
                      console.log(chalk.red(item));
                      break;
                    case 'green':
                      console.log(chalk.green(item));
                      break;
                    case 'blue':
                      console.log(chalk.blue(item));
                      break;
                    case 'yellow':
                      console.log(chalk.yellow(item));
                      break;
                  }
                }
              });
            });
          } else {
            console.log(chalk.red('There is no element in the list'));
          }
        }
      });
    }
  },
});

yargs.command({
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

yargs.command({
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

yargs.command({
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

yargs.command({
  command: 'addUser',
  describe: 'Adds a new user',
  builder: {
    user: {
      describe: 'User Name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      fs.readdir(`src/notes`, (err, data) => {
        if (err) {
          console.log(chalk.red('There must be a problem'));
        } else {
          data.forEach((item) => {
            if (item === argv.user) {
              console.log(chalk.red('The user that is going to add already exists'));
            } else {
              fs.mkdir(`src/notes/${argv.user}`, (err) => {
                if (err) {
                  console.log(chalk.red('There must be a problem to create the user'));
                } else {
                  console.log(chalk.green('The user was succefully created'));
                }
              });
            }
          });
        }
      });
    }
  },
});

yargs.parse();
