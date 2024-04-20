const {DataSource, EntitySchema} = require('typeorm'); 

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "apijs",
    synchronize: true,
    logging: false,
    entities: [
        require("./src/entity/PostSchema"),
        require("./src/entity/CategorySchema"),
    ],
    migrations: [],
    subscribers: [],
})

module.exports = AppDataSource;