import { product } from "./models/product";
import { store } from "./models/store";
import { getStore } from "./providers/storeProvider";
import { storeService } from "./services/storeService";
const sp: product = {
    exempt: true,
    id: 1,
    imported: true,
    name: "Walkman",
    price : 75.99,
};

const str: store = getStore();
const sService: storeService = new storeService(str);
console.log(str);
const total = sService.calculateTotal(sp, 1);
console.log(`total ${total}`);
