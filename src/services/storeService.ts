import { basket } from "../models/basket";
import { receipt } from "../models/receipt";

export class storeService{
    public purchase(order: basket): receipt {

        const rcpt: receipt = {
            receiptProducts : [],
            total: 0,
        };
        return rcpt;
    }
}
