const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');
const dataPath = path.join(__dirname, '../data/products.json');

router.get('/', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading data' });
        }

        const allProducts = JSON.parse(data);
        const searchQuery = req.query.search || '';
        const selectedType = req.query.type || 'all';
        const displayCount = parseInt(req.query.display) || 8;
        const currentPage = parseInt(req.query.pages) || 1;

        let filteredProducts = allProducts.filter(product =>
            selectedType === 'all' || product.type === selectedType
        );

        if (searchQuery) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        const startIndex = (currentPage - 1) * displayCount;
        const paginatedProducts = filteredProducts.slice(startIndex, startIndex + displayCount);

        return res.json({
            count: filteredProducts.length,
            products: paginatedProducts
        });
    });
});

module.exports = router;
