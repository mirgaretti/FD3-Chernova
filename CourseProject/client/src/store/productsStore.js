import { action, makeAutoObservable } from "mobx";

class ProductsStore {
    products = []; 
    count = 0;

    constructor() {
        makeAutoObservable(this);
    }

    fetchProducts = action(async (searchQuery = '', selectedType = 'all', displayCount = 8, currentPage = 1) => {
        try {
            const response = await fetch(`/api/products?search=${searchQuery}&type=${selectedType}&display=${displayCount}&pages=${currentPage}`);
            const data = await response.json();
            this.setProducts(data.products);
            this.setCount(data.count);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    });

    setProducts = (products) => {
        this.products = products; 
    };

    setCount = (count) => {
        this.count = count;
    }

    reduceStock = (cart) => {
        cart.forEach(({ id, count }) => {
            const product = this.products.find(product => product.id === id); 
            if (product) {
                product.stock = Math.max(0, product.stock - count);
            }
        });
    };
}

const productsStore = new ProductsStore();
export default productsStore;
