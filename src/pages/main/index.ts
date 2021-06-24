import Page from '../../templates/page';
import SettingsPage from '../setting';
import createElem from '../../shared/createElement';

import { PageIds } from '../../pages/app';

class MainPage extends Page {
  constructor(id: string) {
    super(id);
  }

  startGame() {
    window.location.hash = `#${PageIds.GamePage}`;
  }
  changeSettings() {
    window.location.hash = `#${PageIds.SettingsPage}`;
    new SettingsPage('settings').render();
  }

  render() {
    const steps = createElem('div', 'steps', '');
    const btns = createElem('div', 'btns-game', '');
    this.container.appendChild(steps);
    this.container.appendChild(btns);

    const firstStep = createElem(
      'p',
      'step__first',
      'Configure your game settings',
    );
    const secondStep = createElem(
      'p',
      'step__second',
      'Start you new game! Remember card positions and match it before times up.',
    );
    const thirdStep = createElem(
      'p',
      'step__third',
      'Register your score and watch TOP!',
    );
    steps.appendChild(firstStep);
    steps.appendChild(secondStep);
    steps.appendChild(thirdStep);

    const SettingsBtn = createElem(
      'button',
      'btn__settings button',
      'Settings Game',
    );
    const startGameBtn = createElem(
      'button',
      'btn__start-game button',
      'Start Game',
    );

    btns.appendChild(startGameBtn);
    btns.appendChild(SettingsBtn);

    startGameBtn.addEventListener('click', this.startGame);
    SettingsBtn.addEventListener('click', this.changeSettings);

    return this.container;
  }
}

export default MainPage;
