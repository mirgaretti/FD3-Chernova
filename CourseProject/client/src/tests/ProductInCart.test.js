import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductInCart from '../components/ProductInCart';
import cartStore from '../store/cartStore';

jest.mock('../store/cartStore', () => ({
    updateCart: jest.fn(),
}));

const mockProduct = {
    id: 1,
    count: 4,
    name: "New Year Tree",
    price: 2500,
    stock: 34,
    rating: 4.7,
    image: "/images/01.png",
    type: "friends",
    color: "#436FFF"
};

describe('ProductInCart Component', () => {
    it('renders product information correctly', () => {
        render(<ProductInCart product={mockProduct} onRemove={jest.fn()} />);
        
        expect(screen.getByAltText(/New Year Tree/i)).toBeInTheDocument();
        expect(screen.getByText(/New Year Tree/i)).toBeInTheDocument();
        expect(screen.getByText(/2500\$/i)).toBeInTheDocument();
        expect(screen.getByText(/4/i)).toBeInTheDocument(); 
    });

    it('increases the product count when the add button is clicked', () => {
        render(<ProductInCart product={mockProduct} onRemove={jest.fn()} />);

        const addButton = screen.getByAltText(/add/i);
        fireEvent.click(addButton);
        expect(cartStore.updateCart).toHaveBeenCalledWith(mockProduct, 5);
    });

    it('decreases the product count when the sub button is clicked', () => {
        render(<ProductInCart product={mockProduct} onRemove={jest.fn()} />);

        const subButton = screen.getByAltText(/sub/i);
        fireEvent.click(subButton);
        expect(cartStore.updateCart).toHaveBeenCalledWith(mockProduct, 3);
    });

    it('does not decrease count below 1', () => {
        const productWithOneCount = { ...mockProduct, count: 1 };
        render(<ProductInCart product={productWithOneCount} onRemove={jest.fn()} />);

        const subButton = screen.getByAltText(/sub/i);
        fireEvent.click(subButton);
        expect(cartStore.updateCart).not.toHaveBeenCalled();
    });

    it('does not increase count above stock', () => {
        const productWithMaxCount = { ...mockProduct, count: 34 };
        render(<ProductInCart product={productWithMaxCount} onRemove={jest.fn()} />);

        const addButton = screen.getByAltText(/add/i);
        fireEvent.click(addButton);
        expect(cartStore.updateCart).not.toHaveBeenCalled(); 
    });

    it('removes the product from the cart when delete button is clicked', () => {
        const onRemove = jest.fn();
        render(<ProductInCart product={mockProduct} onRemove={onRemove} />);

        const deleteButton = screen.getByAltText(/delete/i);
        fireEvent.click(deleteButton);
        expect(onRemove).toHaveBeenCalledWith(mockProduct.id); 
    });
});
