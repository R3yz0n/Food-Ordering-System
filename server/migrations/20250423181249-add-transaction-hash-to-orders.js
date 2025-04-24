"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        // Adding the column without dropping existing data
        await queryInterface.addColumn("orders", "transactionHash", {
            type: Sequelize.STRING,
            allowNull: true, // Making it nullable since existing orders won't have this
            after: "status", // Place it after the status column
        });
    },

    async down(queryInterface, Sequelize) {
        // If we need to rollback, we can safely remove the column
        await queryInterface.removeColumn("orders", "transactionHash");
    },
};
