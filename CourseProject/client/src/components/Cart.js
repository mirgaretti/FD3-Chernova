import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import ProductInCart from './ProductInCart';
import cartStore from '../store/cartStore';
import { action, toJS } from 'mobx';

const Cart = observer(({ products, onPurchase, width }) => {
    const currProducts = products.filter(prod => 
        cartStore.cart.some(item => item.id === prod.id)
    );

    const [currentPage, setCurrentPage] = useState(0);
    const [promo, setPromo] = useState('');
    const [removing, setRemoving] = useState(new Map());
    
    const itemsPerPage = width > 950 ? 4 : 2;
    const displayedProducts = currProducts.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage);

    useEffect(() => {
        setCurrentPage(0);
    }, [itemsPerPage]);

    const handleNextPage = () => {
        if ((currentPage + 1) * itemsPerPage < currProducts.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const removeFromCart = (id) => {
        setRemoving(prev => new Map(prev).set(id, true));

        setTimeout(() => {
            cartStore.removeFromCart(id);
            setRemoving(prev => {
                const newMap = new Map(prev);
                newMap.delete(id);
                return newMap;
            });
        }, 300);
    };
    console.log(cartStore.calculateTotal());
    const { total = 0, detailedList = [] } = cartStore.calculateTotal() || {}; 
    console.log('detailedList', toJS(detailedList));

    return (
        <div className="main">
            <img className="garland" src="/images/bg-garland.png" alt="garland" />
            <div className="cart">
                <p className="title">gift shop cart</p>
                <div className='cart-block'>
                    <div className='items'> 
                        <img 
                            src="/images/navLeft.svg" 
                            alt="Previous" 
                            className={`nav ${currentPage === 0 ? 'inactive' : ''}`} 
                            onClick={handlePrevPage} 
                        />
                        <div className="cart-products" style={{ gridTemplateColumns: displayedProducts.length ? '1fr 1fr' : '1fr'}}>
                            {displayedProducts.length 
                                ? displayedProducts.map((item, index) => (
                                    <div key={index} className={`cart-product ${removing.get(item.id) ? 'removing' : ''}`}>
                                        <ProductInCart 
                                            product={detailedList.find(prod => prod.id === item.id)} 
                                            onRemove={action(() => removeFromCart(item.id))} 
                                        />
                                    </div>
                                )) 
                                : <img src="/images/emptyCart.svg" alt="emptyCart" className='emptyCard'/>}
                        </div>
                        <img 
                            src="/images/navRight.svg" 
                            alt="Next" 
                            className={`nav ${((currentPage + 1) * itemsPerPage >= currProducts.length) ? 'inactive' : ''}`} 
                            onClick={handleNextPage} 
                        />
                    </div>
                    <div className='total'>
                        <div className='total-top'>
                            {promo === 'hello' ? (
                                <p style={{ color: '#FF4646', textDecoration: 'line-through' }}>
                                    Total: {total}$ <span style={{ color: 'black', textDecoration: 'unset' }}>{total / 2}$</span>
                                </p>
                            ) : (
                                <p>Total: {total}$</p>
                            )}
                        </div>
                        <div className="detailed-list">
                            {detailedList.map(({ name, price, count, itemTotal }, index) => (
                                <p key={index} style={{ backgroundColor: index % 2 === 0 ? 'rgba(255, 70, 70, 0.1)' : 'rgba(255, 255, 255, 1)'}}>
                                    {name} {price}$ * {count} = {itemTotal}$
                                </p>
                            ))}
                        </div>
                        <div className='total-bottom'>
                            <input type="text" placeholder='enter promotional code' onInput={e => setPromo(e.target.value)}/>
                            <button onClick={() => onPurchase(promo, total)}>purchase</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Cart;
