import MainPage from '../main';
import SettingsPage from '../setting';
import ScorePage from '../score';
import Header from '../../components/header';
import Page from '../../templates/page';
import { Game } from '../game';

export const enum PageIds {
  MainPage = 'main-page',
  ScorePage = 'score-page',
  SettingsPage = 'setting-page',
  GamePage = 'game-page',
}

class App {
  private static container: HTMLElement = document.body;

  private initialPage: MainPage;

  private header: Header;

  private static defaultPageId = 'current-page';

  static async renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }

    let page: Page | null = null;

    let activePage = document.querySelectorAll('.header-nav__elem');

    if (idPage === PageIds.MainPage) {
      activePage.forEach(elem => {
        if (elem.textContent == 'About Game') {
          elem.classList.add('active');
        } else elem.classList.remove('active');
      });
      page = new MainPage(idPage);
    } else if (idPage === PageIds.SettingsPage) {
      page = new SettingsPage(idPage);
      activePage.forEach(elem => {
        if (elem.textContent == 'Game Settings') {
          elem.classList.add('active');
        } else elem.classList.remove('active');
      });
    } else if (idPage === PageIds.ScorePage) {
      page = new ScorePage(idPage);
      activePage.forEach(elem => {
        if (elem.textContent == 'Best Score') {
          elem.classList.add('active');
        } else elem.classList.remove('active');
      });
    } else if (idPage === PageIds.GamePage) {
      activePage.forEach(elem => {
        elem.classList.remove('active');
      });
      page = new Game(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container.appendChild(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  constructor() {
    this.initialPage = new MainPage('main-page');
    this.header = new Header('header', 'header-container');
  }

  run() {
    App.container.append(this.header.render());
    this.enableRouteChange();
    App.renderNewPage(PageIds.MainPage);
  }
}

export default App;
