
  module.exports = (sequelize, Sequelize) => {
    const NewExpenseSchema = sequelize.define("NewExpenseSchema", {
        _Id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        payee:{
            type: Sequelize.STRING,
            allowNull: false
        },
        totalBillAmount: { 
            type: Sequelize.INTEGER, allowNull: false 
        },
        splitAuto:{
            type: Sequelize.BOOLEAN, allowNull: false 
        }

    }
      );
  
    return NewExpenseSchema;
  };
