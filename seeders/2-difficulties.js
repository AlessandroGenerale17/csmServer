'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'difficulties',
            [
                {
                    name: 'Easy',
                    value: 0,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'Medium',
                    value: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'Hard',
                    value: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('difficulties', null, {});
    }
};
