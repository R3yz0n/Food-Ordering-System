'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'paymentIntentId', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('orders', 'paymentStatus', {
      type: Sequelize.ENUM('pending', 'succeeded', 'failed', 'canceled'),
      defaultValue: 'pending',
      allowNull: false,
    });

    await queryInterface.addColumn('orders', 'paymentMethod', {
      type: Sequelize.ENUM('stripe', 'metamask'),
      allowNull: true,
    });

    await queryInterface.addColumn('orders', 'stripeCustomerId', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('orders', 'paymentIntentId');
    await queryInterface.removeColumn('orders', 'paymentStatus');
    await queryInterface.removeColumn('orders', 'paymentMethod');
    await queryInterface.removeColumn('orders', 'stripeCustomerId');
  }
};
