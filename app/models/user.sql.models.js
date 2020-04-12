
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        _id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
      username: {
        type: Sequelize.STRING,
        allowNull: false

      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING
      },
      required: {
        type: Sequelize.BOOLEAN
      },
      phoneNumber: {
        type: Sequelize.STRING(100)
      },
      photolink: {
        type: Sequelize.STRING
      },
      totalSpendAmount: {
           type: Sequelize.INTEGER ,
        defaultValue: 0},
    totalPaidAmount: { 
        type: Sequelize.INTEGER,
        defaultValue:0},
    finalStatus: { 
        type: Sequelize.INTEGER ,
        defaultValue:0},
    });
  
    return User;
  };