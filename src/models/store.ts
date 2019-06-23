import { product } from "./product";
import { taxRates } from "./taxRates";

export interface store {
    products: product[];
    taxrates: taxRates;
}
