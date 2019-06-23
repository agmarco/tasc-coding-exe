import { product } from "./models/product";
import { store } from "./models/store";
import { getStore } from "./providers/storeProvider";
const sp: product = {
    exempt: false,
    id: 1,
    imported: false,
    name: "some product",
    price : 10,
};

const str: store = getStore();
console.log("hello helloo");
console.log(str);
console.log(sp);
