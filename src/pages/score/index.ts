import Page from '../../templates/page';

class ScorePage extends Page {
  constructor(id: string) {
    super(id);
  }

  render() {
    return this.container;
  }
}

export default ScorePage;
