'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      this.belongsTo(models.Members,{
        as:'attend',
        foreignKey:'member',
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE'
      })
    }
  }
  Attendance.init({
    id: {
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    member: DataTypes.UUID,
    client_id: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};