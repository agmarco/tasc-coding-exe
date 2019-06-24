import { getStore } from "../providers/storeProvider";

describe("store tests", () => {
    const str = getStore();
    // first three can be one test, but i like on assert pert test
    it("should create a store", () => {
        expect(str).not
        .toBe(null);
    });
    it("should create products in  a store", () => {
        expect(str.products).not
        .toBe(null);
    });
    it("should create taxrates in  a store", () => {
        expect(str.taxrates).not
        .toBe(null);
    });
});
