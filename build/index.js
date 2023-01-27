"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const cors_1 = __importDefault(require("cors"));
const knex_1 = require("./database/knex");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/product/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.q;
        if (q.length <= 1) {
            res.status(400);
            throw new Error("query params deve possuir pelo menos um caractere");
        }
        const [product] = yield (0, knex_1.db)("products").where({ name: q });
        res.status(200).send({ product: product });
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
}));
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, email, password } = req.body;
        if (typeof id !== "string") {
            res.status(400);
            throw new Error("'id' inválido, deve ser uma string");
        }
        if (typeof email !== "string") {
            res.status(400);
            throw new Error("'email' inválido, deve ser uma string");
        }
        if (typeof password !== "string") {
            res.status(400);
            throw new Error("'password' inválido, deve ser uma string");
        }
        if (id.length < 1 || email.length < 1 || password.length < 2) {
            res.status(400);
            throw new Error("'id' ou 'email' devem ter no minímo 1 caractere");
        }
        yield knex_1.db.insert({
            id: id,
            email: email,
            password: password
        }).into("users");
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.post("/users", (req, res) => {
    try {
        const id = req.body.id;
        const email = req.body.email;
        const password = req.body.password;
        const findId = database_1.users.find((user) => user.id === id);
        if (findId) {
            res.status(400);
            throw new Error("ID indisponivel");
        }
        const findEmail = database_1.users.find((user) => user.email === email);
        if (findEmail) {
            res.status(400);
            throw new Error("EMAIL indisponivel");
        }
        const newUser = {
            id,
            email,
            password,
        };
        database_1.users.push(newUser);
        res.status(201).send("Usuario criado com sucesso 😎");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const category = req.body.category;
        const findId = database_1.products.find((product) => product.id === id);
        if (findId) {
            res.status(400);
            throw new Error("ID indisponivel");
        }
        const newProduct = {
            id,
            name,
            price,
            category,
        };
        yield knex_1.db.raw(`
      INSERT INTO products(id, name, price, category)
      VALUES("${id}", "${name}", "${price}", " "${category}"");`);
        database_1.products.push(newProduct);
        res.status(201).send("Produto criado com sucesso 😎");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
}));
app.post("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, total_price, paid, delivered_at, buyer_id } = req.body;
        if (typeof id != "string") {
            res.status(400);
            throw new Error("'id' invalido, deve ser uma string");
        }
        if (typeof delivered_at != "string") {
            res.status(400);
            throw new Error("'delivered_at' invalido, deve ser uma string");
        }
        if (typeof buyer_id != "string") {
            res.status(400);
            throw new Error("'buyer_id' invalido, deve ser uma string");
        }
        if (typeof total_price != "number") {
            res.status(400);
            throw new Error("'total_price' invalido, deve ser um number");
        }
        if (paid > 1 && paid < 0) {
            res.status(400);
            throw new Error("'paid' invalido, deve ser 0 ou 1");
        }
        if (id.length < 1 ||
            paid.length < 1 ||
            delivered_at.length < 1 ||
            buyer_id.length < 1) {
            res.status(400);
            throw new Error("As informações devem ter no minimo 1 caractere");
        }
        yield knex_1.db.raw(`
      INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
      VALUES ("${id}", "${total_price}", "${paid}", "${delivered_at}", "${buyer_id}")
    `);
        res.status(200).send(`Compra cadastrada com sucesso`);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
}));
app.get("/purchases/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [result] = yield (0, knex_1.db)("purchases").where({ id: id });
        if (!result) {
            res.status(404);
            throw new Error("Compra não encontrada");
        }
        const [user] = yield (0, knex_1.db)("users").where({ id: result.buyer_id });
        result["name"] = user.name;
        result["email"] = user.email;
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/users/:id/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const purchases = yield knex_1.db.raw(`
        SELECT * FROM purchases
        WHERE buyer_id = "${id}"
      ;`);
        res.status(200).send({ purchases: purchases });
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
}));
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const result = database_1.products.find((product) => product.id === id);
    res.status(200).send("objeto product encontrado");
});
app.get("/users/:id/purchase", (req, res) => {
    const id = req.params.id;
    const result = database_1.purchases.filter((purchase) => purchase.userId === id);
    res.status(200).send(result);
});
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const indexToRemove = database_1.users.findIndex((user) => user.id === id);
    if (indexToRemove >= 0) {
        database_1.users.splice(indexToRemove, 1);
    }
    res.status(200).send("User apagado com sucesso");
});
app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    const indexToRemove = database_1.products.findIndex((product) => product.id === id);
    if (indexToRemove >= 0) {
        database_1.products.splice(indexToRemove, 1);
    }
    res.status(200).send("Produto apagado com sucesso");
});
app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const newId = req.body.id;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    const resultToEdit = database_1.users.find((user) => user.id === id);
    if (resultToEdit) {
        resultToEdit.id = newId || resultToEdit.id;
        resultToEdit.email = newEmail || resultToEdit.email;
        resultToEdit.password = newPassword || resultToEdit.password;
    }
    res.status(200).send("Atualização realizada com sucesso");
});
app.put("/product/:id", (req, res) => {
    const id = req.params.id;
    const newId = req.body.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newCategory = req.body.category;
    const resultToEdit = database_1.products.find((product) => product.id === id);
    if (resultToEdit) {
        resultToEdit.id = newId || resultToEdit.id;
        resultToEdit.name = newName || resultToEdit.name;
        resultToEdit.price = isNaN(newPrice) ? resultToEdit.price : newPrice;
        resultToEdit.category = newCategory || resultToEdit.category;
    }
    res.status(200).send("Produto atualizado com sucesso");
});
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.db)("users");
        res.status(200).send({ users: result });
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.db)("products");
        res.status(200).send({ products: result });
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/products/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nameProduct = req.query.name;
    try {
        if (nameProduct !== undefined) {
            if (nameProduct.length < 1) {
                res.status(400);
                throw new Error("Insira ao menos 1 caracter");
            }
        }
        const [product] = yield (0, knex_1.db)("products").where({ name: nameProduct });
        res.status(200).send({ products: product });
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
}));
//# sourceMappingURL=index.js.map