import { LiteAppPage } from './app.po';

describe('lite-app App', function() {
  let page: LiteAppPage;

  beforeEach(() => {
    page = new LiteAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
