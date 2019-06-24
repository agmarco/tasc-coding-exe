import { basketCollection } from "../models/basketCollection";

export function getBaskets(): basketCollection {
   const baskets = require("../data/baskets.json") as basketCollection;
   return baskets;
}
