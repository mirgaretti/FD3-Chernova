import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductCard from '../components/ProductCard';
import cartStore from '../store/cartStore';

jest.mock('../store/cartStore', () => ({
    cart: [
        { 
            id: 1,
            name: "New Year Tree",
            price: 2500,
            stock: 34,
            rating: 4.7,
            image: "/images/01.png",
            type: "friends",
            color: "#436FFF"
        }
    ],
}));

const mockProduct = {
    id: 1,
    name: "New Year Tree",
    price: 2500,
    stock: 34,
    rating: 4.7,
    image: "/images/01.png",
    type: "friends",
    color: "#436FFF"
};

describe('ProductCard Component', () => {
    it('renders product information correctly', () => {
        render(<ProductCard product={mockProduct} searchQuery="" onClick={jest.fn()} />);
        
        expect(screen.getByText(/New Year Tree/i)).toBeInTheDocument();
        expect(screen.getByText(/2500\$/i)).toBeInTheDocument();
        expect(screen.getByText(/for friends/i)).toBeInTheDocument();
        expect(screen.getByRole('img', { name: /New Year Tree/i })).toBeInTheDocument();
    });

    it('displays the cart icon if the product is purchased', () => {
        render(<ProductCard product={mockProduct} searchQuery="" onClick={jest.fn()} />);
        expect(screen.getByAltText(/inCart/i)).toBeInTheDocument();
    });

    it('hides the cart icon if the product is not purchased', () => {
        cartStore.cart = []; 

        render(<ProductCard product={mockProduct} searchQuery="" onClick={jest.fn()} />);
        expect(screen.queryByAltText(/inCart/i)).not.toBeInTheDocument();
    });

    it('highlights text matching the search query', () => {
        render(<ProductCard product={mockProduct} searchQuery="new" onClick={jest.fn()} />);
        
        const highlightedSpans = screen.getAllByText(/New/i);
        expect(highlightedSpans).toHaveLength(1); 
        expect(highlightedSpans[0]).toHaveStyle('color: white');
        expect(highlightedSpans[0]).toHaveStyle('background-color: rgba(255, 70, 70, 1)');
    });

    it('does not allow clicking if the product is out of stock', () => {
        const outOfStockProduct = { ...mockProduct, stock: 0 };
        const handleClick = jest.fn();

        render(<ProductCard product={outOfStockProduct} searchQuery="" onClick={handleClick} />);
        const productCard = screen.getByRole('img', { name: /New Year Tree/i }).closest('.product-card');
        fireEvent.click(productCard);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('allows clicking if the product is in stock', () => {
        const handleClick = jest.fn();

        render(<ProductCard product={mockProduct} searchQuery="" onClick={handleClick} />);
        const productCard = screen.getByRole('img', { name: /New Year Tree/i }).closest('.product-card');
        fireEvent.click(productCard);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
