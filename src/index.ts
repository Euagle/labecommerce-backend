import { 
    acessarProductId, 
    acessarProductsName,
    createPurchase,
    getAllPurchasesFromUserId 
} from "./database";

console.log(acessarProductsName("mouse"));
console.log(createPurchase("1", "1", 3, 15));