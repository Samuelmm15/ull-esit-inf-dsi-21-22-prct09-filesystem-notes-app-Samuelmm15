
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
}
