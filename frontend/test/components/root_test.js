import { expect, renderComponent } from '../test_helper';
import { Route, Redirect } from 'react-router-dom';
import Root from '../../src/root';
import ForcastError from '../../src/components/forecast_error';
import ForcastIndex from '../../src/components/forecast_index';

// import sinon from 'sinon';


// import {mount, render, shallow} from 'enzyme';

describe('Root' , () => {
  let wrapper;

  beforeEach(() => {
     wrapper = renderComponent(Root, 'shallow');
  });
  

  it('shows ForecastError in the correct path', () => {
    expect(wrapper.find(Route).first())
    .to.have.props(['path', 'component'])
    .deep.equal([ '/error', ForcastError ]);
  });

  it('shows ForecastIndex in the correct path', () => {
    expect(wrapper.find(Route).last())
    .to.have.props(['path', 'component'])
    .deep.equal([ '/forecast/:id', ForcastIndex ]);
  });

  it('redirects when the path is /', () => {
    expect(wrapper.find(Redirect).first())
    .to.have.props(['from', 'to'])
    .deep.equal([ '/', '/forecast/1' ]);
  });


});
