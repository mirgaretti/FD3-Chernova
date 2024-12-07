import React from 'react';
import cartStore from '../store/cartStore';
import { action } from 'mobx';

const ProductInCart = ({ product, onRemove }) => {
    return (
        <div className="product-cart">
            <img src={product.image} alt={product.name} className="product-image" />
            <p className="name">{product.name}</p>
            <div> 
                <p className="price">{product.price}$</p>
                <div className='amount'>
                    <img 
                        src="/images/sub.svg" 
                        alt="sub" 
                        onClick={() => {
                             if (product.count > 1) action(() => cartStore.updateCart(product, product.count - 1))();
                        }} 
                        style={{ opacity: product.count === 1 ? 0.3 : 1, cursor: product.count === 1 ? 'not-allowed' : 'pointer' }}/>
                    <p>{product.count}</p>
                    <img 
                        src="/images/add.svg" 
                        alt="add" 
                        style={{ opacity: product.count === product.stock ? 0.3 : 1, cursor: product.count === product.stock ? 'not-allowed' : 'pointer' }}
                        onClick={() => {
                            if (product.count < product.stock) action(() => cartStore.updateCart(product, product.count + 1))();
                        }} 
                    />
                    <img 
                        src="/images/delete.svg" 
                        alt="delete" 
                        onClick={() => onRemove(product.id)} 
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductInCart;