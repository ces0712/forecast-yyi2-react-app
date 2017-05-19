import { expect, renderComponent } from '../test_helper';
import ForecastError from '../../src/components/forecast_error';


describe('ForecastError' , () => {
  let wrapper;
  before(function () {
      this.jsdom = require('jsdom-global')()
    })
  after(function () {
      this.jsdom()
    })


  beforeEach(() => {
    wrapper = renderComponent(ForecastError, 'mount');
  });

  it('shows error message', () => {
     expect(wrapper).to.have.html()
     .match(/Sorry, contact your administrator all the cities where selected/);
  });
  
});
