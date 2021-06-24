import { BaseComponent } from '../base-component';
import { PageIds } from '../../pages/app';
import Dexie from 'dexie';
import { db, Contact } from '../database/db';

export class RegisterPopUp extends BaseComponent {
  private form: HTMLElement;
  private isInvalid: boolean = false;

  constructor() {
    super('div', 'form-wrapper');
    this.form = this.element;
    this.form.innerHTML = `
      <form name='regestration'>
        <label class='label' for='name'>First name:</label>
        <input class='form-registr__input' id='firstName'  type="text" placeholder='Daria' name='first-name' required>
        <label class='label' for='last-name'>Last name:</label>
        <input class='form-registr__input' id='lastName' type="text" placeholder='Avramova' name='last-name' required>
        <label class='label' for='name'>Email:</label>
        <input class='form-registr__input' id='email' type="text" placeholder='avramova@gmail.ru' name='email' required> 
        <div class='form-btns'>
          <button class='button block' type='button' id="add-user">ADD USER</button>
          <button class='button'  type='button'  id="cancel">Cancel</button>
        </div>
      </form>
    `;
    this.element.append();
  }
  showPopup() {
    this.element.classList.add('show-form');
  }
  closePopup() {
    document.querySelector('.form-wrapper').classList.remove('show-form');
  }
  checkInput() {
    this.isInvalid = true;
    let firstName = <HTMLInputElement>document.getElementById('firstName');
    let lastName = <HTMLInputElement>document.getElementById('lastName');
    let email = <HTMLInputElement>document.getElementById('email');
    if (
      !/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u.test(
        firstName.value,
      )
    ) {
      firstName.classList.add('invalid');
      this.isInvalid = false;
    } else {
      firstName.classList.remove('invalid');
    }
    if (
      !/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u.test(
        lastName.value,
      )
    ) {
      lastName.classList.add('invalid');
      this.isInvalid = false;
    } else {
      lastName.classList.remove('invalid');
    }
    if (
      !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
        email.value,
      )
    ) {
      email.classList.add('invalid');
      this.isInvalid = false;
    } else {
      email.classList.remove('invalid');
    }
    if (!this.isInvalid) {
      document.getElementById('add-user').classList.add('block');
    } else document.getElementById('add-user').classList.remove('block');
  }

  addUser() {
    if (!document.querySelector('.block')) {
      console.log(this.addToDB, this.closePopup());
      this.closePopup();
      console.log('moi  ozdravlenia');
      window.location.hash = `#${PageIds.ScorePage}`;
    }
  }

  async addToDB() {
    console.log('add to DB');
    await db.transaction('rw', db.contacts, async function () {
      let firstMan = await db.contacts.add(
        new Contact('Arnold', 'Fitzgerald', 'addad@mail.ru', '00:24'),
      );
      let secondtMan = await db.contacts.add(
        new Contact('Dar', 'Darisha', '11ds@mail.ru', '00:47'),
      );
    });
    let contacts = await db.transaction('r', [db.contacts], async () => {
      let contacts = await db.contacts
        .where('firstName')
        .startsWithAnyOfIgnoreCase('a', 'b', 'c')
        .sortBy('id');
      return contacts;
    });
    contacts.forEach(contact => {
      console.log(
        contact.id +
          '. ' +
          contact.first +
          ' ' +
          contact.last +
          ' ' +
          contact.email +
          ' ' +
          contact.time,
      );
    });
  }

  render() {
    console.log('popUp');
    return this.element;
  }
}
