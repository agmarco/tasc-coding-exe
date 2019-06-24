import { basket } from "../models/basket";
import { getStore } from "../providers/storeProvider";
import { storeService } from "../services/storeService";

describe("store service tests", () => {
  const str = getStore();
  const strService = new storeService(str);
  it("should find a product", () => {
    const prod = strService.getProduct(0);
    expect(prod.name)
    .toBe("16lb bag of Skittles");
  });
  it("should NOT find a product", () => {
    const t = () => strService.getProduct(500);
    expect(t)
    .toThrowError();
  });
  it("should calculate import tax to be 0", () => {
    const importTax = strService.calculateImportTax(
      strService.getProduct(0),
      1,
    );
    expect(importTax)
    .toBe(0);
  });
  it("should calculate import tax to be more than 0", () => {
    const importTax = strService.calculateImportTax(
      strService.getProduct(3),
      1,
    );
    expect(importTax)
    .toBe(0.55);
  });
  it("should calculate sales tax to be 0", () => {
    const salesTax = strService.calculateSalesTax(strService.getProduct(0), 1);
    expect(salesTax)
    .toBe(0);
  });
  it("should calculate sales tax to be more than 0", () => {
    const salesTax = strService.calculateSalesTax(strService.getProduct(1), 1);
    expect(salesTax)
    .toBe(10);
  });
  it("should calculate total for a single exempt, non imported product", () => {
    const total = strService.calculateTotal(strService.getProduct(0), 1);
    expect(total.total)
    .toBe(16);
  });
  it("should calculate total for a single  non exempt, imported product", () => {
    const total = strService.calculateTotal(strService.getProduct(3), 1);
    expect(total.total)
    .toBe(11.55);
  });
  it("should calculate total for a single  exempt, imported product", () => {
    const total = strService.calculateTotal(strService.getProduct(5), 1);
    expect(total.total)
    .toBe(79.79);
  });
  it("should calculate basket 1 total", () => {
    const bket: basket = {
      id: 0,
      products: [
        { id: 0, name: "16lb bag of Skittles", quantity: 1 },
        { id: 1, name: "Walkman at 99.99", quantity: 1 },
        { id: 2, name: "bag of microwave Popcorn ", quantity: 1 },
      ],
    };
    const receipt = strService.purchase(bket);
    expect(receipt.total)
    .toBe(126.98);
  });
  it("should calculate basket 2 total", () => {
    const bket: basket = {
      id: 1,
      products: [
        {
          id: 3,
          name: "imported bag of Vanilla-Hazelnut Coffee ",
          quantity: 1,
        },
        {
          id: 4,
          name: "Imported Vespa",
          quantity: 1,
        },
      ],
    };
    const receipt = strService.purchase(bket);
    expect(receipt.total)
    .toBe(17263.05);
  });
  it("should calculate basket 3 total", () => {
    const bket: basket = {
      id: 2,
      products: [
        {
          id: 5,
          name: "imported crate of Almond Snickers ",
          quantity: 1,
        },
        {
          id: 6,
          name: "Discman",
          quantity: 1,
        },
        {
          id: 7,
          name: "Imported Bottle of Wine",
          quantity: 1,
        },
        {
          id: 8,
          name: "300# bag of Fair-Trade Coffee",
          quantity: 1,
        },
      ],
    };
    const receipt = strService.purchase(bket);
    expect(receipt.total)
    .toBe(1149.78);
  });
});
