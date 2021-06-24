import Component from '../../templates/components';
import { PageIds } from '../../pages/app';
import { Game } from '../../pages/game';
import { create } from 'eslint/lib/rules/*';
import createElem from '../../shared/createElement';

const Btns = [
  {
    id: PageIds.MainPage,
    text: 'About Game',
  },
  {
    id: PageIds.SettingsPage,
    text: 'Game Settings',
  },
  {
    id: PageIds.ScorePage,
    text: 'Best Score',
  },
];

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  startGame() {
    window.location.hash = `#${PageIds.GamePage}`;
  }

  renderPageBtns() {
    const icons = createElem('div', 'header-icons', '');
    icons.innerHTML = `
      <p>Match</p>
      <p>Match</p>
    `;
    this.constainer.append(icons);

    const pageBtns = createElem('div', 'header-nav', '');
    Btns.forEach(button => {
      const btnHTML = document.createElement('a');
      btnHTML.className = 'header-nav__elem';
      btnHTML.href = `#${button.id}`;
      btnHTML.innerHTML = button.text;
      pageBtns.append(btnHTML);
    });
    this.constainer.append(pageBtns);

    const startBtn = document.createElement('button');
    startBtn.innerText = `Start Game`;
    startBtn.className = 'header-btn';
    this.constainer.append(startBtn);

    startBtn.addEventListener('click', this.startGame);
  }

  render() {
    this.renderPageBtns();
    return this.constainer;
  }
}

export default Header;
