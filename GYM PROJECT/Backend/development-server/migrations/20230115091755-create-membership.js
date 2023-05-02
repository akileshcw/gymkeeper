'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Memberships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID,
        references:{
          model:'Members',
          key:'uuid'
        }
      },
      frmdate: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      todate: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      month: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      days: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      tot_amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      amount_paid: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      balance: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      mop: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      is_delete: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Memberships');
  }
};