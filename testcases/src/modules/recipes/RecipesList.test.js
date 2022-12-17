import RecipesList from './RecipesList';
import React from 'react';
import {render, screen} from '@testing-library/react';
import fakeData from './constants';

function setupFetchStub(data) {
    return function fetchStub() {
        return new Promise((resolve) => {
            resolve({
                json: () =>
                    Promise.resolve({
                        data,
                    }),
            });
        });
    };
}
describe('RecipesList', () => {
    beforeAll(() => {
        // const fakeData = {fake: 'data'};
        global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData));
    });
    afterAll(() => {
        delete global.fetch;
    });
  describe('Recipes', () => {
    it('should return the recipes', () => {
        const { debug } = render(<RecipesList />);
        debug();
        // console.log('--container', container, 'getByText'   , getByText);
    });
  });
});
