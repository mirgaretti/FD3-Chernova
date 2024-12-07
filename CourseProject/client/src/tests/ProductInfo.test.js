import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductInfo from '../components/ProductInfo';
import cartStore from '../store/cartStore';

jest.mock('../store/cartStore', () => ({
    cart: [],
    updateCart: jest.fn(),
}));

const mockProduct = {
    id: 1,
    name: "New Year Tree",
    price: 2500,
    stock: 34,
    rating: 4.7,
    image: "/images/01.png",
    type: "friends",
    color: "#436FFF",
};

describe('ProductInfo Component', () => {

    it('renders product information correctly', () => {
        render(<ProductInfo product={mockProduct} onClose={jest.fn()} />);
    
        expect(screen.getByAltText(/New Year Tree/i)).toBeInTheDocument();
        expect(screen.getByText(/New Year Tree/i)).toBeInTheDocument();
        expect(screen.getByText(/balance - 34 pcs./i)).toBeInTheDocument();
        const priceElement = screen.getByText(/2500/i, { selector: 'p.price' });
        expect(priceElement).toBeInTheDocument();
        expect(screen.getByText(/4.7/i)).toBeInTheDocument();
    });
    
    it('increases product count when the add button is clicked', () => {
        render(<ProductInfo product={mockProduct} onClose={jest.fn()} />);

        const addButton = screen.getByAltText(/add/i);
        fireEvent.click(addButton);
        expect(screen.getByText(/Total: 5000\$/i)).toBeInTheDocument();
    });

    it('decreases product count when the sub button is clicked', () => {
        render(<ProductInfo product={mockProduct} onClose={jest.fn()} />);

        const subButton = screen.getByAltText(/sub/i);
        const addButton = screen.getByAltText(/add/i);

        fireEvent.click(addButton);
        expect(screen.getByText(/Total: 5000\$/i)).toBeInTheDocument();
        fireEvent.click(subButton);
        expect(screen.getByText(/Total: 2500\$/i)).toBeInTheDocument(); 
    });

    it('does not decrease count below 1', () => {
        render(<ProductInfo product={mockProduct} onClose={jest.fn()} />);

        const subButton = screen.getByAltText(/sub/i);
        fireEvent.click(subButton); 
        expect(screen.getByText(/Total: 2500\$/i)).toBeInTheDocument(); 
    });

    it('closes the modal when close button is clicked', () => {
        const handleClose = jest.fn();
        render(<ProductInfo product={mockProduct} onClose={handleClose} />);

        const closeButton = screen.getByAltText(/close/i);
        fireEvent.click(closeButton);
        expect(handleClose).toHaveBeenCalledTimes(1); 
    });

    it('adds the product to the cart when cart button is clicked', () => {
        const handleClose = jest.fn();
        render(<ProductInfo product={mockProduct} onClose={handleClose} />);

        const addButton = screen.getByAltText(/cart/i);
        fireEvent.click(addButton);
        expect(cartStore.updateCart).toHaveBeenCalledWith(mockProduct, 1); 
        expect(handleClose).toHaveBeenCalledTimes(1); 
    });

    it('does not allow increasing count above stock', () => {
        const highStockProduct = { ...mockProduct, stock: 5 }; 
        render(<ProductInfo product={highStockProduct} onClose={jest.fn()} />);
        const addButton = screen.getByAltText(/add/i);
        
        for (let i = 0; i < 4; i++) {
            fireEvent.click(addButton);
        }
    
        fireEvent.click(addButton); 
        const totalText = screen.getByText(/Total:/i);
        expect(totalText).toHaveTextContent('Total: 12500$'); 
    });
});
