'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'snippets',
            [
                {
                    title: 'How to log to console',
                    description: 'JS implementation on how to long to console',
                    code: 'console.log("Hello, world!");',
                    userId: 1,
                    languageId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'For loop',
                    description: 'JS implementation for loop',
                    code: 'for (let i = 0; i < N; i++);',
                    userId: 1,
                    languageId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('snippets', null, {});
    }
};
