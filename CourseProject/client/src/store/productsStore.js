import { makeAutoObservable } from "mobx";
import axios from "axios"; // Не забудьте импортировать axios

class ProductsStore {
    products = []; 

    constructor() {
        makeAutoObservable(this);
        this.fetchProducts(); 
    }

    fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            this.setProducts(response.data); 
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    setProducts = (products) => {
        this.products = products; 
    };

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
