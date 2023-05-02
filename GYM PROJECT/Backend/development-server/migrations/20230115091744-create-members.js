'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Members', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true

      },
      client_id: {
        type: Sequelize.INTEGER,
        // autoIncrement: true,
        allowNull: true
      },
      uuid: {
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phonenumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      org_name: {
        type: Sequelize.STRING,
        references: {
          model: 'Organization',
          key: 'name'
        }
      },
      dob: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bloodgroup: {
        allowNull: false,
        type: Sequelize.STRING
      },
      profession: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Members');
  }
};