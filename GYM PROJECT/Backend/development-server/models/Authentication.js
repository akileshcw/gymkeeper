'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Authentication extends Model {
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
  Authentication.init({
    uuid:{
      type:DataTypes.UUID,
      primaryKey:true
    },
    name: DataTypes.STRING,
    email: {
      type:DataTypes.STRING
    },
    password: DataTypes.STRING,
    org_name : DataTypes.STRING,
    role: {type :DataTypes.STRING}
  }, {
    sequelize,
    modelName: 'Authentication',
  });
  return Authentication;
};