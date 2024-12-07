import React, { useEffect, useState } from 'react';
import { useNavigate, useHref, useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductInfo from './ProductInfo';
import productsStore from '../store/productsStore';
import { observer } from 'mobx-react';
import { set } from 'mobx';

const Gifts = observer(({ searchQuery }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [history] = useHref();
    const [displayCount, setDisplayCount] = useState(searchParams.get('display') || 8);
    const [currentPage, setCurrentPage] = useState(searchParams.get('pages') || 1);
    const [selectedType, setSelectedType] = useState(searchParams.get('type') ||'all');
    const [currentProduct, setCurrentProduct] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
        const display = searchParams.get('display');
        const page = searchParams.get('pages');
        const type = searchParams.get('type') || 'all';

        if (display) setDisplayCount(parseInt(display));
        if (page) setCurrentPage(parseInt(page));
        setSelectedType(type);
        productsStore.fetchProducts(searchQuery, type, display, page);
    }, [searchParams, searchQuery]);

    const handleTabClick = (count) => {
        setSearchParams({ display: count, pages: 1, type: selectedType });
    };

    const handleTypeChange = (type) => {
        setSearchParams({ display: displayCount, pages: 1, type });
    };

    const totalPages = Math.ceil(productsStore.count / displayCount);

    const renderTabs = () => {
        const tabCounts = [8, 20, 40, 60];
        return (
            <div className="tabs" style={{ justifyContent: 'flex-start' }}>
                {tabCounts.map((count) => (
                    <p
                        key={count}
                        onClick={() => handleTabClick(count)}
                        className={displayCount === count ? 'active' : ''}
                    >
                        by {count}
                    </p>
                ))}
            </div>
        );
    };

    const renderTypeSelectors = () => {
        const types = ['all', 'family', 'prime', 'friends'];
        return (
            <div className="tabs" style={{ justifyContent: 'flex-end' }}>
                {types.map((type) => (
                    <p
                        key={type}
                        onClick={() => handleTypeChange(type)}
                        className={selectedType === type ? 'active' : ''}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </p>
                ))}
            </div>
        );
    };

    return (
        <>
            {currentProduct && (
                <ProductInfo
                    product={productsStore.products.find((product) => product.id === currentProduct)}
                    onClose={() => setCurrentProduct(null)}
                />
            )}
            <div className="main">
                <img className="garland" src="/images/bg-garland.png" alt="garland" />
                <p className="description">Give the magic to your family and friends!</p>
                <div className="pagination">
                    {renderTabs()}
                    {windowWidth < 1050 ? (
                        <>
                            {renderTypeSelectors()}
                            <div>
                                <button
                                    onClick={() => setSearchParams({ display: displayCount, pages: Math.max(currentPage - 1, 1), type: selectedType })}
                                    disabled={currentPage === 1}
                                    style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                                >
                                    <img src="/images/arrow-left.svg" alt="arrow" />
                                </button>
                                <p>
                                    Page {currentPage} of {totalPages}
                                </p>
                                <button
                                    onClick={() => setSearchParams({
                                        display: displayCount,
                                        pages: Math.min(currentPage + 1, totalPages),
                                        type: selectedType,
                                    })}
                                    disabled={currentPage === totalPages}
                                    style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                                >
                                    <img src="/images/arrow-right.svg" alt="arrow" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <button
                                    onClick={() => setSearchParams({
                                        display: displayCount,
                                        pages: Math.max(currentPage - 1, 1),
                                        type: selectedType,
                                    })}
                                    disabled={currentPage === 1}
                                    style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                                >
                                    <img src="/images/arrow-left.svg" alt="arrow" />
                                </button>
                                <p>
                                    Page {currentPage} of {totalPages}
                                </p>
                                <button
                                    onClick={() => setSearchParams({
                                        display: displayCount,
                                        pages: Math.min(currentPage + 1, totalPages),
                                        type: selectedType,
                                    })}
                                    disabled={currentPage === totalPages}
                                    style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                                >
                                    <img src="/images/arrow-right.svg" alt="arrow" />
                                </button>
                            </div>
                            {renderTypeSelectors()}
                        </>
                    )}
                </div>
                <div className="container">
                    {productsStore.products && productsStore.products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            searchQuery={searchQuery}
                            onClick={() => setCurrentProduct(product.id)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
});

export default Gifts;
