"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.products = exports.users = void 0;
exports.users = [
    {
        id: '01',
        email: 'euagle@gmail.com',
        password: 'a123f'
    }, {
        id: '02',
        email: 'eujoao@gmail.com',
        password: 'aksdkl4'
    }
];
exports.products = [
    {
        id: '01',
        name: 'cama king',
        price: 1.200,
        category: 'casa'
    }, {
        id: '02',
        name: 'mesa',
        price: 1.200,
        category: 'casa'
    }
];
exports.purchase = [
    {
        userId: '01',
        productId: '01',
        quantity: 2,
        totalPrice: 2.200
    }, {
        userId: '02',
        productId: '02',
        quantity: 1,
        totalPrice: 2.00
    }
];
//# sourceMappingURL=database.js.map