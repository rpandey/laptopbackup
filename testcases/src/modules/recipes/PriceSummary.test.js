import React from 'react';
import {render, screen} from '@testing-library/react';
import PriceSummary from './PriceSummary';
import {CART_SUMMARY} from './constants';
describe('<PriceSummary/>', () => {
    

    test('renders PriceSummary successfully', () => {
        render(<PriceSummary {...CART_SUMMARY}/>);
        const title = screen.getByText(/Chicken Sausage & Spinach Ravioli/i);
        const title2 = screen.getByText(/Gouda Vibes Burgers x 2/i);
        const totalPrice = screen.getByTestId('totalCharges').textContent;
        const shippingChargesText = screen.getByTestId('shippingCharges').textContent;
        expect(title).toBeTruthy();
        expect(title2).toBeTruthy();
        expect(totalPrice).toBe('$48.94');
        expect(shippingChargesText).toBe('$12.98');
    });
});
