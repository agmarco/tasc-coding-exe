import { basket } from "../models/basket";
import { product } from "../models/product";
import { receipt } from "../models/receipt";
import { receiptProduct } from "../models/receiptProduct";
import { store } from "../models/store";
import { taxCalculation } from "../models/taxCalculation";

export class storeService {
  /**
   * Creates a service to purchase a basket of products.
   * Takes an initialized store for easy testing and di
   */
  constructor(private readonly _store: store) {}

  public purchase(order: basket): receipt {
    // First we find our product and calculate each of their taxes and totals
    const receiptProducts = order.products.map((prod) => {
      const storeProd = this.getProduct(prod.id);
      const calculatedTotal = this.calculateTotal(storeProd, prod.quantity);
      const importRate = storeProd.imported
        ? this._store.taxrates.importRate
        : this._store.taxrates.exemptRate;
      const taxRate = storeProd.exempt
        ? this._store.taxrates.exemptRate
        : this._store.taxrates.baseRate;
      const recProd: receiptProduct = {
        importRate,
        importTax: calculatedTotal.importTax,
        productName: storeProd.name,
        quantity: prod.quantity,
        salesTax: calculatedTotal.salesTax,
        subTotal: calculatedTotal.salesTax,
        taxRate,
        total: calculatedTotal.total,
      };
      return recProd;
    });

    const salesTax =
      Math.round(
        receiptProducts.reduce(
          (accumulator, currProd) => accumulator + currProd.salesTax + currProd.importTax, 0)
             / this._store.taxrates.totalRoundMultiple)
            / (1 / this._store.taxrates.totalRoundMultiple);

    const total =
      Math.round(
        receiptProducts.reduce(
          (accumulator, currProd) => accumulator + currProd.total, 0) / this._store.taxrates.totalRoundMultiple)
          / (1 / this._store.taxrates.totalRoundMultiple);

    const rcpt: receipt = {
      receiptProducts,
      salesTax,
      total,
    };
    return rcpt;
  }

  // isolating tax functions for testing and calculating possible tax might come handy later
  public calculateImportTax(prod: product, itemTotal: number): number {
    const importTaxRate = prod.imported
      ? this._store.taxrates.importRate
      : this._store.taxrates.exemptRate;
    const roundMultiple = this._store.taxrates.taxRoundMultiple;
    const importTax =
      Math.ceil((itemTotal * prod.price * importTaxRate) / roundMultiple) /
      (1 / roundMultiple);
    return importTax;
  }

  public calculateSalesTax(prod: product, itemTotal: number): number {
    const salesTaxRate = prod.exempt
      ? this._store.taxrates.exemptRate
      : this._store.taxrates.baseRate;
    const roundMultiple = this._store.taxrates.taxRoundMultiple;
    const pretotal = itemTotal * prod.price;
    const salesTax =
      Math.ceil((pretotal * salesTaxRate) / roundMultiple) /
      (1 / roundMultiple);
    return salesTax;
  }

  public calculateTotal(prod: product, itemTotal: number): taxCalculation {
    const subTotal = prod.price * itemTotal;
    const salesTax = this.calculateSalesTax(prod, itemTotal);
    const importTax = this.calculateImportTax(prod, itemTotal);
    const total =
      Math.round(
        (subTotal + salesTax + importTax) /
          this._store.taxrates.totalRoundMultiple)
          / (1 / this._store.taxrates.totalRoundMultiple);
    return { total, importTax, salesTax, subTotal };
  }

  // This gets a product based on id for convinience,
  // expect the service's client to have figured out IDs before
  // doing anything with the service.
  // Throws an error when not found...because we don't like to
  // give stuff away for free
  public getProduct(id: number): product {
    const prod = this._store.products.find((prd) => prd.id === id);
    if (!prod) {
      throw new Error(`Product id:${id} was not found`);
    }
    return prod;
  }
}
