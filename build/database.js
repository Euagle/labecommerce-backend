"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.acessarProductsName = exports.acessarProductId = exports.acessarProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchases = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    {
        id: "1",
        email: "gleice@mail.com",
        password: "a123"
    },
    {
        id: "2",
        email: "paulo@mail.com",
        password: "a456"
    },
    {
        id: "3",
        email: "Ricardoaks@gmail.com",
        password: "a283u"
    }
];
exports.products = [
    {
        id: "1",
        name: "Teclado",
        price: 7,
        category: types_1.PRODUCT_CATEGORY.ACCESSORIES
    },
    {
        id: "2",
        name: "Fone",
        price: 1,
        category: types_1.PRODUCT_CATEGORY.ACCESSORIES
    },
    {
        id: "3",
        name: "Mouse",
        price: 5,
        category: types_1.PRODUCT_CATEGORY.ACCESSORIES
    }
];
exports.purchases = [
    {
        userId: "1",
        productId: "1",
        quantity: 1,
        totalPrice: 5
    },
    {
        userId: "2",
        productId: "2",
        quantity: 2,
        totalPrice: 30
    }
];
function createUser(id, email, password) {
    exports.users.push({
        id,
        email,
        password
    });
    return ("Cadastro realizado com sucesso");
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
    exports.products.push({
        id,
        name,
        price,
        category
    });
    return ("Produto criado com sucesso");
}
exports.createProduct = createProduct;
function acessarProducts() {
    return exports.products;
}
exports.acessarProducts = acessarProducts;
function acessarProductId(id) {
    return exports.products.find(product => product.id === id);
}
exports.acessarProductId = acessarProductId;
function acessarProductsName(q) {
    return exports.products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()));
}
exports.acessarProductsName = acessarProductsName;
function createPurchase(userId, productId, quantity, totalPrice) {
    exports.purchases.push({
        userId,
        productId,
        quantity,
        totalPrice
    });
    return ("Compra realizada com sucesso");
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserId(userIdToSearch) {
    return exports.purchases.filter(purchase => purchase.userId === userIdToSearch);
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map