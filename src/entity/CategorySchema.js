const EntitySchema = require("typeorm").EntitySchema;
const Category = require("../model/Category").Category; 

module.exports = new EntitySchema({
    name: "Category",
    target: Category,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        }
    }
});