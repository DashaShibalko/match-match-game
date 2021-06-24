import Page from '../../templates/page';
import { Card } from '../../components/card/card';
import { CardsField } from '../../components/cards-field/card-field';
import { RegisterPopUp } from '../../components/registration/registratoin';

import { delay } from '../../shared/delay';
import { ImageCategoryModels } from '../../models/image-category-models';
import createElem from '../../shared/createElement';

const FLIP_DELAY = 3000;
export class Game extends Page {
  private readonly cardsField: CardsField;
  private activeCard?: Card;
  private isAnimation = false;
  private timeHTML: HTMLElement;
  private timer: ReturnType<typeof setInterval>;
  private registration: RegisterPopUp;

  constructor(id: string) {
    super(id);
    this.timeHTML = createElem('div', 'timer', '');
    this.cardsField = new CardsField();
    this.registration = new RegisterPopUp();
    document.body.appendChild(this.registration.element);
    this.container.appendChild(this.cardsField.element); //Изменено
    this.container.appendChild(this.timeHTML);
  }

  newGame(images: string[]) {
    this.cardsField.clear();

    const cards = images
      .concat(images)
      .map(url => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach(card => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });
    this.cardsField.addCards(cards);
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.image != card.image) {
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]); // RED error state
    }
    this.activeCard = undefined;
    this.isAnimation = false;
    this.finishGame();
  }
  render() {
    this.start();
    return this.container;
  }
  startTime() {
    console.log(this.timeHTML, this.timer);
    let millisec = 0;
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      millisec += 1000;
      let dateTimer = new Date(millisec);
      this.timeHTML.innerHTML =
        ('0' + dateTimer.getUTCMinutes()).slice(-2) +
        ':' +
        ('0' + dateTimer.getUTCSeconds()).slice(-2);
    }, 1000);
  }

  finishGame() {
    let result = false;
    if (!document.querySelector('.flipped')) {
      result = true;
    }
    if (result) {
      clearInterval(this.timer);
      this.timeHTML.innerHTML = '00:00';
      this.registration.showPopup();
      document.querySelectorAll('.form-registr__input').forEach(elem => {
        elem.addEventListener('change', this.registration.checkInput);
      });
    }
    let addUserBTN = document.getElementById('add-user');
    let canselPopupBtn = document.getElementById('cancel');
    addUserBTN.addEventListener('click', this.registration.addUser);
    canselPopupBtn.addEventListener('click', this.registration.closePopup);
  }
  async start() {
    const res = await fetch('./assets/images.json');
    const categories: ImageCategoryModels[] = await res.json();
    const cat = categories[0];
    const images = cat.images.map(name => `${cat.category}/${name}`);
    this.newGame(images);
    setTimeout(() => this.startTime(), FLIP_DELAY + 1000);
    return this.container;
  }
}
