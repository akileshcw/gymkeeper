"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Membership, {
        as: "membership",
        foreignKey: "member",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      this.hasMany(models.Attendance, {
        as: "attendance",
        foreignKey: "member",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.Organization, {
        as: "org",
        foreignKey: "org_name",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  Members.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      client_id: {
        type: DataTypes.INTEGER,
        // autoIncrement: true
        allowNull: true,
      },
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      phonenumber: {
        type: DataTypes.STRING,
      },
      image: DataTypes.STRING,
      org_name: DataTypes.STRING,
      dob: DataTypes.DATEONLY,
      gender: DataTypes.STRING,
      bloodgroup: DataTypes.STRING,
      profession: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Members",
    }
  );
  return Members;
};
