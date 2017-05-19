import { expect } from '../test_helper';
import { FETCH_CITIES, FETCH_CITY, UPDATE_CITY } from '../../src/actions';
// because its calling the index file doesn't need to
// specify webpack interpretate
import  { fetchCity, fetchCities, updateCity } from '../../src/actions';
import { mockCities, mockCity } from '../data';
import axios from 'axios';

import sinon from 'sinon';

describe('actions', () => {
  let xhr;
  //let requests;
  let sandbox;
  let action;

  before(function () {
    this.jsdom = require('jsdom-global')();
  });

  after(function () {
    this.jsdom();
  });


  beforeEach(() => {
    global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
  });


  describe('fetchCity', () => {
    beforeEach(() => {
      xhr = sinon.useFakeXMLHttpRequest();
      sandbox = sinon.sandbox.create();
      sandbox.stub(axios, 'get').returns(Promise.resolve(mockCity));

      // requests = [mockCity];
      xhr.onCreate = function (req) { sandbox.push(req); };
      action = fetchCity(1);

    });

    afterEach(function () {
      // Like before we must clean up when tampering with globals.
      sinon.assert.called(axios.get);
      xhr.restore();
      sandbox.restore();
    });

    it('has the correct type', () => {
      // expect(requests.length).to.equal(1);
      expect(action.type).to.equal(FETCH_CITY);
    });

    it('has the correct payload', () => {
      expect(action.payload).to.be.a('promise');
    });
  });

  describe('fetchCities', () => {
    beforeEach(() => {
      xhr = sinon.useFakeXMLHttpRequest();
      sandbox = sinon.sandbox.create();
      sandbox.stub(axios, 'get').returns(Promise.resolve(mockCities));
      // requests = [mockCities];
      xhr.onCreate = function (req) { sandbox.push(req); };
      action = fetchCities();

    });

    afterEach(function () {
      // Like before we must clean up when tampering with globals.
      sinon.assert.called(axios.get);
      xhr.restore();
      sandbox.restore();
    });

    it('has the correct type', () => {
      expect(action.type).to.equal(FETCH_CITIES);
    });

    it('has the correct payload', () => {
      expect(action.payload).to.be.a('promise');
    });
  });

  describe('updateCity', () => {
    beforeEach(() => {
      xhr = sinon.useFakeXMLHttpRequest();
      sandbox = sinon.sandbox.create();
      sandbox.stub(axios, 'put').returns(Promise.resolve(mockCities));
      // requests = [mockCities];
      xhr.onCreate = function (req) { sandbox.push(req); };
      const updateValue = { status: 0 };
      action = updateCity(1, updateValue);
    });

    afterEach(function () {
      // Like before we must clean up when tampering with globals.
      sinon.assert.called(axios.put);
      xhr.restore();
      sandbox.restore();
    });

    it('has the correct type', () => {
      expect(action.type).to.equal(UPDATE_CITY);
    });

    it('has the correct payload', () => {
      expect(action.payload).to.be.a('promise');
    });

  });

});