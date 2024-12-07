import React, { useState } from 'react';
import { observer } from 'mobx-react';
import{ toJS } from 'mobx';
import PurchaseBill from './PurchaseBill';
import purchasesStore from '../store/purchasesStore';

const Purchases = observer(() => {
    const allPurchases = purchasesStore.purchases;
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = (startIndex + itemsPerPage) > allPurchases.length ? allPurchases.length : startIndex + itemsPerPage;
    const displayedProducts = allPurchases.slice(startIndex, endIndex);
    
    const handleNextPage = () => {
        if ((currentPage + 1) * itemsPerPage < allPurchases.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="main">
            <img className="garland" src="/images/bg-garland.png" alt="garland" />
            <div className="purchases">
                <p className="title">purchases</p>
                <div className="purchases-block">
                    <img 
                        src="/images/purLeft.svg" 
                        alt="Previous" 
                        className={`nav ${currentPage === 0 ? 'inactive' : ''}`} 
                        onClick={handlePrevPage} 
                    />
                    <div className="purchases-products">
                        {allPurchases.length ? 
                            displayedProducts.map((item, index) => (
                                <PurchaseBill key={index} purchase={item} />
                            ))
                            : <img src="/images/emptyPurchases.svg" alt="emptyPurchases" className='emptyPurchases'/>
                        }
                    </div>
                    <img 
                        src="/images/purRight.svg" 
                        alt="Next" 
                        className={`nav ${((currentPage + 1) * itemsPerPage >= allPurchases.length) ? 'inactive' : ''}`} 
                        onClick={handleNextPage} 
                    />
                </div>
                <p className="pages">items {allPurchases.length ? startIndex+1 : 0}-{endIndex} of {allPurchases.length}</p>
            </div>
        </div>
    );
});

export default Purchases;
