
  module.exports = (sequelize, Sequelize) => {
    const BuddySchema = sequelize.define("BuddySchema", {
        _Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        expense: {
            type: Sequelize.INTEGER
        }
    }
      );
  
    return BuddySchema;
  };