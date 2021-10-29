const { Sequelize } = require("sequelize");

if (process.env.NODE_ENV === "production") {

    module.exports = new Sequelize(`${process.env.HEROKU_POSTGRESQL_YELLOW_URL}?sslmode=require`, {
        url: process.env.HEROKU_POSTGRESQL_YELLOW_URL,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false,
            }
        }
    });

} else {

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

