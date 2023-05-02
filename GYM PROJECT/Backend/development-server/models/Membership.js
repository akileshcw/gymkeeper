"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Members, {
        as: "memb",
        foreignKey: "uuid",
        targetKey: 'uuid',
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  Membership.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: DataTypes.UUID,
      frmdate: DataTypes.DATEONLY,
      todate: DataTypes.DATEONLY,
      month: DataTypes.INTEGER,
      days: DataTypes.INTEGER,
      tot_amount: DataTypes.INTEGER,
      amount_paid: DataTypes.INTEGER,
      balance: DataTypes.INTEGER,
      mop: DataTypes.STRING,
      status: DataTypes.STRING,
      is_delete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Membership",
    }
  );
  return Membership;
};
