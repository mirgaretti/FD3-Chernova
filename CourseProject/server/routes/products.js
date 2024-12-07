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
        
        const searchQuery = req.query.search; 
        if (searchQuery) {
            const filteredProducts = allProducts.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            const matchedIds = filteredProducts.map(product => product.id);
            console.log('Matched IDs:', matchedIds);
            return res.json(matchedIds);
        }

        return res.json(allProducts);
    });
});

module.exports = router;
