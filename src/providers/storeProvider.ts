
import { product } from "../models/product.js";
import { store } from "../models/store";
import { taxRates } from "../models/taxRates.js";

export function getStore(): store {
    // these can be loaded async but there is not much of a
    // point for that in this exercise
    const products = require("../data/products.json") as product[];
    const taxrates = require("../data/taxRates.json") as taxRates;
    const str: store = {
        products,
        taxrates,
    };
    return str;
}
