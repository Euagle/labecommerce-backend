"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const knex_1 = __importDefault(require("knex"));
exports.db = (0, knex_1.default)({
    client: "sqlite3",
    connection: {
        filename: "./src/database/labecommerce.db",
    },
    useNullAsDefault: true,
    pool: {
        min: 0,
        max: 1
    }
});
//# sourceMappingURL=knex.js.map