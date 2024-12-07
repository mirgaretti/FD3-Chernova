import { makeAutoObservable } from "mobx";

class PurchasesStore {
    purchases = []; 

    constructor() {
        makeAutoObservable(this);
    }

    addPurchase = (cart, promo, total) => {
        this.purchases.push({ cart, time: Date.now(), promo, total }); 
    };
}

const purchasesStore = new PurchasesStore();
export default purchasesStore;
