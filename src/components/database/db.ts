import Dexie from 'dexie';

export class AppDatabase extends Dexie {
  contacts: Dexie.Table<Contact, number>;

  constructor() {
    super('scoreDB');

    var db = this;

    db.version(1).stores({
      contacts: '++id, first, last,email, time',
    });
    db.contacts.mapToClass(Contact);
  }
}
export class Contact {
  id?: number;
  first: string;
  last: string;
  email: string;
  time: string;

  constructor(firts: string, last: string, email: string, time: string) {
    this.email = email;
    this.first = firts;
    this.last = last;
    this.time = time;
  }

  save() {
    return db.transaction('rw', db.contacts, async () => {
      this.id = await db.contacts.put(this);
    });
  }
}

export var db = new AppDatabase();
