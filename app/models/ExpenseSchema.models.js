module.exports = (sequelize, Sequelize) => {
    const ExpenseSchema = sequelize.define("ExpenseSchema", {
        userId:{
            type: Sequelize.INTEGER,
            primaryKey: true,
        }}
      );
  
    return ExpenseSchema;
  };