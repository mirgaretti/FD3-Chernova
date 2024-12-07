import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import productsStore from './store/productsStore'; 
import Gifts from './components/Gifts';
import Cart from './components/Cart';
import Purchases from './components/Purchases';
import cartStore from './store/cartStore';
import purchasesStore from './store/purchasesStore';
import { action } from 'mobx';
import './styles/styles.css';

const App = observer(() => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [searchQuery, setSearchQuery] = useState(''); 

    useEffect(() => {
        productsStore.fetchProducts();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (cartStore.cart.length > 0 || purchasesStore.purchases.length > 0) {
                const message = 'Are you sure you want to leave the page? All unsaved data will be lost.';
                e.returnValue = message; 
                return message; 
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [cartStore.cart, purchasesStore.purchases]);

    const handleSearchChange = (query) => {
        console.log(query);
        setSearchQuery(query); 
    };

    const handleUpdateStock = (promo, total) => {
        productsStore.reduceStock(cartStore.cart);
        purchasesStore.addPurchase(cartStore.cart, promo, total);
        cartStore.cart = [];
    }

    return (
        <>
            <Router>
                <div className="header">
                    <div className="logo">
                        <img src="/images/snowFlake.svg" alt="logo" />
                        <p>gift shop</p>
                    </div>
                    <div className="search">  
                        <img src="/images/search.svg" alt="search" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onInput={(e) => handleSearchChange(e.target.value)}
                        />
                    </div>
                    <div className="menu">
                        <NavLink to="/gifts" className={({ isActive }) => (isActive ? "desktop active" : "desktop")}>
                            <p>Gifts</p>
                        </NavLink>
                        <NavLink to="/cart" className={({ isActive }) => (isActive ? "desktop active" : "desktop")}>
                            <p>Cart</p>
                        </NavLink>
                        <NavLink to="/purchases" className={({ isActive }) => (isActive ? "desktop active" : "desktop")}>
                            <p>Purchases</p>
                        </NavLink>
                        <NavLink to="/contacts" className={({ isActive }) => (isActive ? "desktop active" : "desktop")}>
                            <p>Contacts</p>
                        </NavLink>

                        <NavLink to="/gifts" className={({ isActive }) => (isActive ? "mobile active" : "mobile")}>
                            <img src="/images/menuGift.svg" alt="menuGift" />
                        </NavLink>
                        <NavLink to="/cart" className={({ isActive }) => (isActive ? "mobile active" : "mobile")}>
                            <img src="/images/menuCart.svg" alt="menuCart" />
                        </NavLink>
                        <NavLink to="/purchases" className={({ isActive }) => (isActive ? "mobile active" : "mobile")}>
                            <img src="/images/menuBill.svg" alt="menuBill" />
                        </NavLink>
                        <NavLink to="/contacts" className={({ isActive }) => (isActive ? "mobile active" : "mobile ")}>
                            <img src="/images/menuContacts.svg" alt="menuContacts" />
                        </NavLink>
                    </div>
                </div>

                <Routes>
                    <Route path="/gifts" element={<Gifts products={productsStore.products} searchQuery={searchQuery} />} /> {/* Передача searchQuery */}
                    <Route path="/cart" element={<Cart products={productsStore.products} onPurchase={action(handleUpdateStock)} width={windowWidth} />} />
                    <Route path="/purchases" element={<Purchases products={productsStore.products} />} />
                </Routes>
                <div className="footer">
                    <div>
                        <img src="/images/footerTelegram.svg" alt="logo" />
                        <img src="/images/footerFB.svg" alt="logo" />
                        <img src="/images/footerInst.svg" alt="logo" />
                        <img src="/images/footerX.svg" alt="logo" />
                    </div>
                    <div>
                        <img src="/images/santa.svg" alt="logo" />
                    </div>
                </div>
            </Router>
        </>
    );
});

export default App;

