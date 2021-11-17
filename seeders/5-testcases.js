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
                },
                {
                    args: '[0, 1]',
                    solution: '-1',
                    challengeId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    args: '[0, -1]',
                    solution: '1',
                    challengeId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    args: '[109, 100]',
                    solution: '9',
                    challengeId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    args: '[[2,7,11,15], 9]',
                    solution: '[0, 1]',
                    challengeId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    args: '[[3, 2, 4], 6]',
                    solution: '[1, 2]',
                    challengeId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    args: '[[3, 3], 6]',
                    solution: '[0, 1]',
                    challengeId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    args: '[3, 2]',
                    solution: '9',
                    challengeId: 4,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    args: '[2, 10]',
                    solution: '1024',
                    challengeId: 4,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    args: '[2, -2]',
                    solution: '0.25',
                    challengeId: 4,
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
