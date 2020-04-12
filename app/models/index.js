const { Sequelize, Model, DataTypes } = require('sequelize');
const dbConfig = require("../../config/database.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.sql.models")(sequelize, Sequelize);
db.BuddySchema = require("./buddySchema.models.js")(sequelize, Sequelize)
db.newExpenseSchema = require("./NewExpenseSchema.models")(sequelize, Sequelize)
db.ExpenseSchema = require("./ExpenseSchema.models")(sequelize, Sequelize)

db.newExpenseSchema.belongsTo(db.ExpenseSchema);
db.BuddySchema.belongsTo(db.newExpenseSchema);
db.ExpenseSchema.hasMany(db.newExpenseSchema);
db.newExpenseSchema.hasMany(db.BuddySchema);

module.exports = db;