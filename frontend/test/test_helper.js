import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
// react-addons-test-utils is deprecated you can find it as dependency of react-dom for this version
// tried
import ReactTestUtils from 'react-dom/test-utils';
// import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';

import {mount, render, shallow} from 'enzyme';
// const { JSDOM } = jsdom;
import { google } from './mocks'

if (!global.document) {
  try {
    const jsdom = require('jsdom').jsdom; // could throw
    // const jsdom = require('jsdom-global')(); // could throw

    const exposedProperties = ['window', 'navigator', 'document'];

    global.document = jsdom('');
    global.window = document.defaultView;

    Object.keys(document.defaultView).forEach((property) => {
      if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
      }
    });

    global.navigator = {
      userAgent: 'node.js',
    };
  } catch (e) {
    // jsdom is not supported...
  }
  
  global.google = google;  

}




// const $ = _$(window);

chai.use(sinonChai);
chai.use(chaiEnzyme());
// chaiJquery(chai, chai.util, $);

function renderJsx(ComponentClass, props = {}, state = {}) {
  return(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );
}


function renderComponent(ComponentClass, type = 'mount', options, props, state={}) {
  switch(type) {
    case 'mount':
      return mount(<ComponentClass {...props } />, { ...options });
    case 'shallow':
      return shallow(<ComponentClass {...props } />, { ... options });
    case 'render':
      return render(
        <Provider store={createStore(reducers, state)}>
          <ComponentClass {...props } />
         </Provider>
      );
  }
  console.log('Error in render component');
}

// http://stackoverflow.com/questions/40441671/props-params-in-enzyme-test

/*function renderComponentJQ(ComponentClass, props = {}, state = {}) {
  const componentInstance =  ReactTestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance));
}


$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  ReactTestUtils.Simulate[eventName](this[0]);
};*/

export { renderComponent, renderJsx, expect };
