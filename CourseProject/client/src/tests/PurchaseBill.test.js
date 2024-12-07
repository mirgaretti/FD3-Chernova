import React from 'react';
import { render, screen } from '@testing-library/react';
import PurchaseBill from '../components/PurchaseBill'; 
import '@testing-library/jest-dom/extend-expect'; 

const mockPurchase = {
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
        },
        {   
            id: 8,
            image: "/images/05.png",
            name: "Tea Candles",
            price: 450,
            rating: 4.9,
            count: 5, 
            stock: 10,
            type: "friends",
            color: "#06A44F"
        } 
    ]
};

describe('PurchaseBill Component', () => {
    it('renders the purchase bill correctly', () => {
        render(<PurchaseBill purchase={mockPurchase} />);
        
        expect(screen.getByText(/total: 1350/i)).toBeInTheDocument();
        expect(screen.getByText(/Christmas Star/i)).toBeInTheDocument();
        expect(screen.getByText(/300\$\s+x\s+2\s+=\s+600\$/i)).toBeInTheDocument(); 
        expect(screen.getByText(/New Year Candles/i)).toBeInTheDocument();
        expect(screen.getByText(/150\$\s+x\s+5\s+=\s+750\$/i)).toBeInTheDocument(); 
        expect(screen.getByText(/Tea Candles/i)).toBeInTheDocument();
        expect(screen.getByText(/450\$\s+x\s+5\s+=\s+2250\$/i)).toBeInTheDocument();

        const formattedDate = new Date(mockPurchase.time).toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false 
        });
        expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });

    it('shows sale image if promo is applied', () => {
        const salePurchase = {
            ...mockPurchase,
            promo: "hello"
        };

        render(<PurchaseBill purchase={salePurchase} />);
        expect(screen.getByAltText(/sale/i)).toBeInTheDocument();
        expect(screen.getByText(/total: 675/i)).toHaveStyle('color: #FF4646');
    });

    it('does not show sale image if no promo is applied', () => {
        render(<PurchaseBill purchase={mockPurchase} />);
        expect(screen.queryByAltText(/sale/i)).not.toBeInTheDocument();
    });
});
