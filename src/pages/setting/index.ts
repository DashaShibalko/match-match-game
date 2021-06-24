import createElem from '../../shared/createElement';
import Page from '../../templates/page';

class SettingsPage extends Page {
  constructor(id: string) {
    super(id);
  }

  render() {
    const form = createElem('form', 'settings-from', '');

    const labelType = createElem('label', 'card-type', 'Game Cards');
    const labelDifficulty = createElem(
      'label',
      'card-gifficalty',
      'Difficalty',
    );

    const listType = createElem('select', 'form__list-type', '');
    const listDifficulty = createElem('select', 'form__list-diff', '');

    const opt1ListType = createElem('option', 'list-type__opt', 'firts Type');
    console.log(opt1ListType);
    const opt2ListType = createElem('option', 'list-type__opt', 'second Type');
    listType.appendChild(opt1ListType);
    listType.appendChild(opt2ListType);

    const opt1ListDif = createElem('option', 'list-diff__opt', 'first diff');
    const opt2ListDif = createElem('option', 'list-diff__opt', 'sec diff');
    const opt3ListDif = createElem('option', 'list-diff__opt', 'third diff');
    listDifficulty.appendChild(opt1ListDif);
    listDifficulty.appendChild(opt2ListDif);
    listDifficulty.appendChild(opt3ListDif);

    form.appendChild(labelType);
    form.appendChild(listType);
    form.appendChild(labelDifficulty);
    form.appendChild(listDifficulty);
    this.container.appendChild(form);

    return this.container;
  }
}

export default SettingsPage;
