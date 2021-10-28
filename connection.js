const { Sequelize } = require("sequelize");

let connection;

if (process.env.NODE_ENV === "production") {

    module.exports = new Sequelize(`${process.env.DATABASE_URL}?sslmode=require`, {
        url: process.env.DATABASE_URL,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false,
            }
        }
    });

} else {
    console.log("else hit");
    module.exports = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            logging: false
        }
    );
}

