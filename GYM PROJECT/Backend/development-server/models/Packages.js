'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Packages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Organization,{
        as: 'org',
        foreignKey: 'org_name',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Packages.init({
    uuid: DataTypes.UUID,
    package_name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    org_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Packages',
  });
  return Packages;
};