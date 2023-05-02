'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Authentication,{
        as:'authentication',
        foreignKey: 'org_name',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      this.hasMany(models.Members,{
        as:'members',
        foreignKey: 'org_name',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      this.hasMany(models.Packages,{
        as: 'package',
        foreignKey: 'org_name',
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE'
      })
    }
  }
  Organization.init({
    uuid: {type: DataTypes.UUID},
    name: {type:DataTypes.STRING,
      primaryKey: true}
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};