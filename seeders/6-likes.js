'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'likes',
            [
                {
                    userId: 1,
                    snippetId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userId: 1,
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
