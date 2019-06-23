import { receiptProduct } from "./receiptProduct";

export interface receipt {
    receiptProducts: receiptProduct[];
    total: number;
}
