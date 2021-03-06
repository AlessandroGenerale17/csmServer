'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('languages', [
            {
                name: 'JavaScript',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Java',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('languages', null, {});
    }
};
