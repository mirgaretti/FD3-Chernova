import { makeAutoObservable } from "mobx";

class CartStore {
    cart = [];

    constructor() {
        makeAutoObservable(this);
    }

    updateCart(product, count) {
        const existingProduct = this.cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.count = count;
        } else {
            this.cart.push({ ...product, count }); 
        }
    }

    removeFromCart(id) {
        this.cart = this.cart.filter(item => item.id !== id); 
    }

    calculateTotal() {
        let total = 0;
        const detailedList = this.cart.map(item => {
            const itemTotal = item.price * item.count;
            total += itemTotal;
            return {
                ...item,
                itemTotal
                
            };
        });

        return { total, detailedList };
    }
}

const cartStore = new CartStore();
export default cartStore;
