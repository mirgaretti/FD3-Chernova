import React from 'react';
import cartStore from '../store/cartStore';
import { observer } from 'mobx-react';

const ProductCard = observer(({ product, searchQuery, onClick }) => {
    const isPurchased = cartStore.cart.some(item => item.id === product.id);

    const highlightText = (text, query) => {
        if (!query) return text; 
        const regex = new RegExp(`(${query})`, 'gi');
        const parts = text.split(regex); 
        return parts.map((part, index) => 
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={index} style={{ color: 'white', fontWeight: 'bold', backgroundColor: 'rgba(255, 70, 70, 1)', borderRadius: '5px', padding: '2px' }}>{part}</span>
            ) : (
                part
            )
        ); 
    };

    return (
        <div className="product-card" onClick={product.stock === 0 ? null : onClick} style={{ cursor: product.stock === 0 ? 'not-allowed' : 'pointer', opacity: product.stock === 0 ? 0.5 : 1 }}>
            {isPurchased && <img src='/images/inCart.svg' alt="inCart" className="cart-image" />}
            {product.stock === 0 && <img src='/images/sold.svg' alt="sold" className="cart-image" style={{ opacity: 1 }} />}
            <img src={product.image} alt={product.name} className="product-image" />
            <p className="type" style={{ color: product.color }}>
                for {product.type}
            </p>
            <p className="name">{highlightText(product.name, searchQuery)}</p> 
            <p className="price">{product.price}$</p>
        </div>
    );
});

export default ProductCard;

