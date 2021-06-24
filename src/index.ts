import './styles.css';
import App from './pages/app';

window.onload = () => {
  new App().run();
};
//temp
const pojalust = document.createElement('div');
pojalust.innerHTML = 'Пожалуйстк проверьте позже, 3 июня ';
pojalust.style.width = '100%';
pojalust.style.fontSize = 'xxx-large';
pojalust.style.backgroundColor = 'white';

document.body.appendChild(pojalust);
