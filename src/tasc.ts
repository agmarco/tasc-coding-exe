import { basketCollection } from "./models/basketCollection";
import { store } from "./models/store";
import { getBaskets } from "./providers/basketsProdiver";
import { getStore } from "./providers/storeProvider";
import { storeService } from "./services/storeService";

const str: store = getStore();
const strService: storeService = new storeService(str);
const basketcol: basketCollection = getBaskets();

basketcol.baskets.forEach((basket, index) => {
    // list our basket
    console.log(`For shopping basket ${index + 1}`);
    basket.products.forEach((product) => {
        const sproduct = strService.getProduct(product.id);
        console.log(`${product.quantity} ${product.name} ${sproduct.price}`);
    });
    // purchases it
    const receipt = strService.purchase(basket);
    console.log(`Receipt ${index + 1}:`);
    receipt.receiptProducts.forEach((rproduct) => {
        console.log(`${rproduct.quantity} ${rproduct.productName} ${rproduct.total}`);
    });
    console.log(`Sales Taxes: ${receipt.salesTax}`);
    console.log(`Total: ${receipt.total}`);
});
