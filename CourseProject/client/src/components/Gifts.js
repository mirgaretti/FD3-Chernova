import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductInfo from './ProductInfo';

const Gifts = ({ products, searchQuery }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [displayCount, setDisplayCount] = useState(searchParams.get('display') || 8);
    const [currentPage, setCurrentPage] = useState(searchParams.get('pages') || 1);
    const [selectedType, setSelectedType] = useState(searchParams.get('type') ||'all');
    const [currentProduct, setCurrentProduct] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [filteredProducts, setFilteredProducts] = useState(products);

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
    }, []);

    useEffect(() => {
        navigate(`?display=${displayCount}&pages=${currentPage}&type=${selectedType}`);
    }, [displayCount, currentPage, selectedType, navigate]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`/api/products?search=${searchQuery}`);
                const data = await response.json();
                const matchedProducts = products.filter(product => data.includes(product.id));
                setFilteredProducts(matchedProducts); 
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        if (searchQuery) {
            fetchProducts(); 
        } else {
            setFilteredProducts(products); 
        }
    }, [searchQuery, products]);

    const handleTabClick = (count) => {
        setDisplayCount(count);
        setCurrentPage(1);
    };

    const handleTypeChange = (type) => {
        setSelectedType(type);
        setCurrentPage(1);
    };

    const startIndex = (currentPage - 1) * displayCount;
    const endIndex = startIndex + displayCount;

    const currentProducts = filteredProducts.filter(product => 
        selectedType === 'all' || product.type === selectedType
    );

    const totalPages = Math.ceil(currentProducts.length / displayCount);

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
                    product={products.find((product) => product.id === currentProduct)}
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
                                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                                    disabled={currentPage === 1}
                                    style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                                >
                                    <img src="/images/arrow-left.svg" alt="arrow" />
                                </button>
                                <p>
                                    Page {currentPage} of {totalPages}
                                </p>
                                <button
                                    onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
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
                                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                                    disabled={currentPage === 1}
                                    style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                                >
                                    <img src="/images/arrow-left.svg" alt="arrow" />
                                </button>
                                <p>
                                    Page {currentPage} of {totalPages}
                                </p>
                                <button
                                    onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
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
                    {currentProducts.slice(startIndex, endIndex).map((product) => (
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
};

export default Gifts;
