import React from 'react';
import { render, screen } from '@testing-library/react';
import Purchases from '../components/Purchases'; 
import '@testing-library/jest-dom/extend-expect'; 

jest.mock('../store/purchasesStore', () => ({
    purchases: [
        {
            promo: "",
            time: 1733521929017,
            total: 1350,
            cart: [
                {   
                    id: 5,
                    image: "/images/02.png",
                    name: "Christmas Star",
                    price: 300,
                    rating: 4.7,
                    count: 2,
                    stock: 200,
                    type: "friends",
                    color: "#06A44F"
                },
                {   
                    id: 7,
                    image: "/images/04.png",
                    name: "New Year Candles",
                    price: 150,
                    rating: 4.9,
                    count: 5,
                    stock: 70,
                    type: "friends",
                    color: "#06A44F"
                } 
            ]
        }
    ]
}));

describe('Purchases Component', () => {
    it('renders the purchases title', () => {
        render(<Purchases />);
        expect(screen.getByText(/purchases/i)).toBeInTheDocument();
    });

    it('displays the correct number of purchases', () => {
        render(<Purchases />);
        const purchaseElements = screen.getAllByRole('img'); 
        expect(purchaseElements.length).toBe(4); 
    });

    it('displays correct purchase details', () => {
        render(<Purchases />);
        expect(screen.getByText(/Christmas Star/i)).toBeInTheDocument();
        expect(screen.getByText(/New Year Candles/i)).toBeInTheDocument();
        expect(screen.getByText(/300/i)).toBeInTheDocument();
        expect(screen.getByText(/150/i)).toBeInTheDocument();
    });

    it('displays the correct total purchases count', () => {
        render(<Purchases />);
        const totalPurchasesText = screen.getByText(/items 1-1 of 1/i); 
        expect(totalPurchasesText).toBeInTheDocument();
    });

    it('displays navigation arrows', () => {
        render(<Purchases />);
        
        const prevArrow = screen.getByAltText(/Previous/i);
        const nextArrow = screen.getByAltText(/Next/i);
        
        expect(prevArrow).toBeInTheDocument();
        expect(nextArrow).toBeInTheDocument();
        
        expect(prevArrow).toHaveClass('inactive');
        expect(nextArrow).toHaveClass('inactive');
    });
});
