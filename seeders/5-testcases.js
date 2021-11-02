'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'testcases',
            [
                {
                    args: '[0, 1]',
                    solution: '1',
                    challengeId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    args: '[0, -1]',
                    solution: '-1',
                    challengeId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    args: '[2, 10]',
                    solution: '12',
                    challengeId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('testcases', null, {});
    }
};
