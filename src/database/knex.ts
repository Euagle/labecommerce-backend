import knex from "knex"
export const db =knex({
    client: "sqlite3",
    connection:{
        filename: "./src/database/labecomerce.db",

    },
    useNullAsDefault: true,
    pool:{
        min:0,
        max: 1
    }
})