'use strict';
module.exports = (sequelize, DataTypes) => {
  const TransactionHistory = sequelize.define('TransactionHistory', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type:DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    typeOperation: {
      type:DataTypes.ENUM('INCOME','CONSUMPTION'),
      allowNull:false
    },
    sum: {
      type:DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  TransactionHistory.associate = function(models) {
    TransactionHistory.belongsTo(models.User, { foreignKey: 'user_id', sourceKey: 'id' });
  };
  return TransactionHistory;
};