# / PRÁCTICA 9 - APLICACIÓN DE PROCESAMIENTO DE NOTAS DE TEXTO

## // ÍNDICE

1. [Introducción](#id1)
2. [Desarrollo de la práctica](#id2) \
   2.1 [Add New Note](#id3) \
   2.2 [List User Notes](#id4) \
   2.3 [Read a Specific Note](#id5) \
   2.4 [Remove a Specific Note](#id6) \
   2.5 [Modify a Specific Note](#id7) \
   2.6 [Comandos adicionales](#id8)
3. [Funcionamiento de la aplicación](#id9)
4. [Testo de los objetos](#id10)
5. [Conclusión](#id11)

## // Introducción <a name="id1"></a>

Para la realización de esta novena práctica de la asignatura `Desarrollo de Sistemas Informáticos`, se realiza la lectura 
y aprendizaje de dos paquetes que van a ser usados para el correcto desarrollo de dicha práctica.

El primero de estos es [yargs](https://www.npmjs.com/package/yargs).
Este, permite construir una línea de comandos por consola interactiva, es decir, haciendo uso de dicho paquete, se permite 
establecer una serie de comandos con sus respectivas opciones al estilo de bash en Ubuntu.

El segundo paquete se denomina como [chalk](https://www.npmjs.com/package/chalk), este, permite establecer distintos 
estilos de colores para los mensajes que son lanzados por consola. Dicho paquete, logra que los mensajes lanzados por 
consola sean mucho más llamativos y permitir una indicación de mensajes más profesional.

Por último, se realiza la lectura de la API síncrona proporcionada por Node.js, permitiendo trabajar de manera mucho más 
comoda y sencilla con el sistema de ficheros. Para conseguir esto, se hace uso de la librería `fs` que posee distintos 
métodos que son útiles para trabajar con distintas operaciones implantadas para el sistema de ficheros.

## // Desarrollo de la práctica <a name="id2"></a>

Para comenzar con el desarrollo de la novena práctica de la asignatura, se desarrolla la clase `Note`, que, sirve para 
declarar los objetos que serán introducidos dentro de los ficheros **JSON** que cada uno de los usuarios tendrá con cada 
una de las notas que este añada.

Dicha clase tiene el siguiente aspecto:

```
class Note {
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
}
```

Como se puede ver en la clase adjunta anteriormente, los objetos reciben como parámetros, el título de la nota, el 
contenido de la propia nota, el color de esta, y, el usuario que ha añadido dicha nota a la lista de notas que este posee.

Una vez se tienen los objetos que van a ser introducidos dentro de cada uno de los ficheros con formato `.json`. Se 
comienza con el desarrollo de la línea de comandos del programa, haciendo uso del paquete `yargs` para ello.

### /// Add new Note <a name="id3"></a>

El comando para añadir nuevas notas a la colección de notas que poseen los distintos usuarios, queda implementado de la 
siguiente manera:

```
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
      if ((argv.colour === 'red') || (argv.colour === 'blue') || (argv.colour === 'yellow') || (argv.colour === 'green')) {
        const object = new Note(argv.title, argv.body, argv.colour, argv.user);
        fs.readdir(`src/notes/${argv.user}`, (err, data) => {
          if (err) {
            console.log(chalk.red('There must be a problem'));
          } else {
            let flag: number = 1;
            data.forEach((item) => {
              if (item === `${argv.title}.json`) {
                flag = 0;
              }
            });
            if (flag === 0) {
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
      } else {
        console.log(chalk.red('There must be a problem with the valid colours.'));
        console.log(chalk.green('The valid colours are: red, blue, yellow, green.'));
      }
    }
  },
});
```

Como se puede observar anteriormente, tras la correcta introducción de las distintas opciones obligatorias por línea de 
comandos, se comprueba si el color de la nota es el permitido por el programa. A continuación, se recorre todo el 
directorio del usuario que pretende añadir una nueva nota a su propia colección, comprobando, si alguna de las notas que 
este posee, ya existe. Si se produce que, el nuevo título no se encuentra dentro de la colección, se crea dicha nota.


### /// List user Notes <a name="id4"></a>

El siguiente comando construido mediante `yargs`, permite listar todas las notas de un usuario concreto, mostrando el 
color de cada una de las notas. Hay que tener en cuenta que, se muestra el nombre del fichero de cada nota con formato `.json`
, no se muestra el contenido de cada una de las notas. Para ello, se hace uso del comando **read** que será 
desarrollado posteriormente.

```
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
```

Se puede observar que se recorre todo el directorio del usuario que ha sido especificado mediante las opciones, obteniendo 
en cada uno de los casos, la información del color de cada una de las notas, permitiendo mostrar por pantalla cada uno de 
los ficheros junto con sus respectivos colores.

### /// Read a specific Note <a name="id5"></a>

Para la lectura de una nota específica, como opciones del comando, se hace uso del título de una nota en concreto que se 
pretende que sea leída. Para ello, se comprueba anteriormente si dicha nota existe dentro de la lista de notas del usuario 
que ha sido especificado. Posteriormente, si se produce que el título ha sido añadido, se procede a la lectura del 
contenido de la propia nota, es decir, se realiza la obtención de la información del fichero con formato `.json`, y, se 
muestra por pantalla el **body** de la propia nota.

```
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
        let flag: number = 1;
        data.forEach((item) => {
          if (item === `${argv.title}.json`) {
            flag = 0;
            fs.readFile(`src/notes/${argv.user}/${argv.title}.json`, (err, readData) => {
              if (err) {
                console.log(chalk.red('There must be a problem to read'));
              } else {
                const object = JSON.parse(readData.toString());
                console.log(object.body);
              }
            });
          }
        });
        if (flag === 1) {
          console.log(chalk.red('The file that was trying to read does not exists'));
        }
      });
    }
  },
});
```

### /// Remove a specific Note <a name="id6"></a>

Para la eliminación de una nota especificada, se hace uso de una API sícrona de `Node.js` que se denomina como `unlink()`. 
Esta API, se encarga de eliminar concretamente el fichero que queda especificado mediante la ruta que es marcada mediante 
las opciones del comando *remove*.

```
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
```

### /// Modify a specific Note <a name="id7"></a>

Para la modificación de una nota que se encuentra dentro de la lista de notas de un usuarios. Para comenzar, es necesario 
comprobar si el fichero que desea modificar existe, para ello, se recorre el directorio del usuario comprobando si el 
título ha sido añadido anteriormente, si no ocurre esto, se lanza un mensaje de error por consola y, se debe de añadir la 
nota mediante el comando **add**. Si se produce que la nota ha sido añadida anteriormente, se obtiene el contenido previo 
a la modificación de la nota, y, se modifica únicamente el contenido del **body** de la nota. Una vez se tiene esto, se 
reescribe la nota, teniendo por tanto, la nota modificada.

```
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
      let flag: number = 1;
      fs.readdir(`src/notes/${argv.user}`, (err, data) => {
        if (err) {
          console.log(chalk.red('There must be a problem'));
        } else {
          data.forEach((item) => {
            if (item === `${argv.title}.json`) {
              flag = 0;
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
            }
          });
          if (flag === 1) {
            console.log(chalk.red('The file does not exists'));
          }
        }
      });
    }
  },
});
```

### /// Comandos adicionales <a name="id8"></a>

Como comandos opcionales a la aplicación de notas, han sido añadidos dos comandos relacionados con el empleo de los 
usuarios de la aplicación.

El primero de los comandos es `addUser`, este permite añadir nuevos usuarios al sistema, para ello, se recorre la ruta `src/notes`
para comprobar si el nuevo usuario a añadir ya se encuentra dentro del sistema. Si se produce que no ha sido creado el 
usuario, se hace uso de una API síncrona de Node.js denominada como `mkdir()`, que, permite la creación de directorios con 
el nombre específicado.

```
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
```

Por último, se desarrolla el comando `userList`, este permite listar los usuarios que han sido creados dentro del sistema, 
permitiendo así, saber el nombre de los distintos usuarios, y, saber cuántos usuarios existen.

```
yargs.command({
  command: 'userList',
  describe: 'List the user directorys',
  handler() {
    fs.readdir(`src/notes`, (err, data) => {
      if (err) {
        console.log(chalk.red('There must be a problem'));
      } else {
        console.log(chalk.grey('User directory list:'));
        data.forEach((item) => {
          console.log(item);
        });
      }
    });
  },
});
```

## // Funcionamiento de la aplicación de notas <a name="id9"></a>

[img]

## // Testeo de los objetos de tipo `Note` <a name="id10"></a>

Para el testeo del funcionamiento de los objetos generados mediante la clase `Note`, se tiene el siguiente fichero de testeo:

```
const test: Note = new Note('Test', 'This is a test', 'red', 'Samuel');
describe('Class Note tests', () => {
  it('Note getTitle() return Test', () => {
    expect(test.getTitle()).to.be.equal('Test');
  }),
  it('Note getBody() return This is a test', () => {
    expect(test.getBody()).to.be.equal('This is a test');
  }),
  it('Note getColour() return red', () => {
    expect(test.getColour()).to.be.equal('red');
  });
  it('Note getUserName() return Samuel', () => {
    expect(test.getUserName()).to.be.equal('Samuel');
  });
});

const test1: Note = new Note('Test1', 'This is the test1', 'yellow', 'Pepe');
describe('Class Note tests', () => {
  it('Note1 getTitle() return Test1', () => {
    expect(test1.getTitle()).to.be.equal('Test1');
  }),
  it('Note1 getBody() return This is the test1', () => {
    expect(test1.getBody()).to.be.equal('This is the test1');
  }),
  it('Note1 getColour() return yellow', () => {
    expect(test1.getColour()).to.be.equal('yellow');
  });
  it('Note1 getUserName() return Samuel', () => {
    expect(test1.getUserName()).to.be.equal('Pepe');
  });
});
```

Como se puede observar en la imagen adjunta a continuación, el testeo y cubrimiento de código resulta:
[img]

## // Conclusión <a name="id11"></a>

Para concluir, esta novena práctica de la asignatura, ha permitido comprender y tener más conocimiento sobre nuevos 
paquetes como pueden ser para este caso `chalk` y `yargs`.

Por otra parte, el uso de la API síncrona que presenta Node.js, permite obtener nuevos conocimientos sobre todo el poder 
que te da Node.js.
