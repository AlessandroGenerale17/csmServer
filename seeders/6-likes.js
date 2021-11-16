'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'likes',
            [
                {
                    userId: 3,
                    snippetId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userId: 4,
                    snippetId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userId: 5,
                    snippetId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userId: 6,
                    snippetId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userId: 7,
                    snippetId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userId: 3,
                    snippetId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userId: 4,
                    snippetId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userId: 5,
                    snippetId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userId: 6,
                    snippetId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userId: 3,
                    snippetId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userId: 5,
                    snippetId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userId: 7,
                    snippetId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('likes', null, {});
    }
};
