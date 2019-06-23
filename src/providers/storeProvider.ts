
import { product } from "../models/product.js";
import { store } from "../models/store";
import { taxRates } from "../models/taxRates.js";

export function getStore(): store {
    const products = require("../data/products.json") as product[];
    const taxrates = require("../data/taxRates.json") as taxRates;
    const str: store = {
        products,
        taxrates,
    };
    return str;
}
