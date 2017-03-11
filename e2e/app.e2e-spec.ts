import { WatsonSEA2SamplePage } from './app.po';

describe('watson-sea2-sample App', function() {
  let page: WatsonSEA2SamplePage;

  beforeEach(() => {
    page = new WatsonSEA2SamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
