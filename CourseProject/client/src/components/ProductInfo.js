import { action } from 'mobx';
import React, { useMemo, useState } from 'react';
import cartStore from '../store/cartStore';
import { toJS } from 'mobx';

const ProductInfo = ({ product, onClose }) => {
    const [productCount, setProductCount] = useState(cartStore.cart.find(item => item.id === product.id)?.count || 1);

    const addProduct = action(() => {
        console.log('cartStore', toJS(cartStore.cart));
        cartStore.updateCart(product, productCount);
        onClose();
    })

    return (
        <div className="overlay" onClick={onClose}>
            <div className="product-info" onClick={(e) => e.stopPropagation()}>
                <img src="/images/close.svg" alt="close" className="close" onClick={onClose} />
                <img src={product.image} alt={product.name} className="product-info-image" />
                <div className="information">
                    <div className="left">
                        <p className="type" style={{ color: product.color }}>
                            for {product.type}
                        </p>
                        <p className="name">{product.name}</p>
                        <p className="stock">balance - {product.stock} pcs.</p>
                        <div className="rating">
                            <img src="/images/snowFlake.svg" alt="snowFlake" />
                            <p>{product.rating}</p>
                        </div>
                    </div>
                    <div className="right">
                        <p className="price">{product.price}$</p>
                        <div className="amount">
                            <img
                                src="/images/sub.svg"
                                alt="sub"
                                style={{ opacity: productCount === 1 ? 0.3 : 1, cursor: productCount === 1 ? 'not-allowed' : 'pointer' }}
                                onClick={() => productCount !== 1 && setProductCount(productCount - 1)}
                            />
                            <p>{productCount}</p>
                            <img
                                src="/images/add.svg"
                                alt="add"
                                style={{ opacity: productCount === product.stock ? 0.3 : 1, cursor: productCount === product.stock ? 'not-allowed' : 'pointer' }}
                                onClick={() => productCount < product.stock && setProductCount(productCount + 1)}
                            />
                            <img src="/images/cart.svg" alt="cart" onClick={addProduct}/>
                        </div>
                        <p className="stock">Total: {product.price * productCount}$</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
