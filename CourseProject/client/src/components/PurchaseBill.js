import React from 'react';
import { toJS } from 'mobx';

const PurchaseBill = ({ purchase }) => {
    console.log(toJS(purchase))
    const date = new Date(purchase.time);
    const formattedDate = date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    });
    return (
        <div className="purchase-bill">
            {purchase.promo == 'hello' && <img src="/images/sale.svg" alt="sale" className="sale"/>}
            <div className="top">
                <p className="total" style={{ color: purchase.promo == 'hello' ? '#FF4646' : 'rgba(24, 28, 41, 1)'}}>total: { purchase.promo == 'hello' ? purchase.total / 2 : purchase.total}$</p>
                <div className="time">
                    <img src="/images/time.svg" alt="time" />
                    <p className="date">{formattedDate}</p>
                </div>
            </div>
            <div className="list">
                {purchase.cart.map((item, index) => (
                    <div key={item.id} className="item" style={{ backgroundColor: index % 2 === 0 ? 'rgba(255, 70, 70, 0.2)' : 'rgba(255, 70, 70, 0.1)' }} >
                        <p>{item.name}</p>
                        <p>{item.price}$ x {item.count} = {item.count * item.price}$</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PurchaseBill;