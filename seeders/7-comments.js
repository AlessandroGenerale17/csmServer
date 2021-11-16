'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'comments',
            [
                {
                    userId: 7,
                    snippetId: 4,
                    text: 'Interesting... I finally understood this :D, thanks!',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userId: 5,
                    snippetId: 1,
                    text: 'What is the point of this?',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userId: 6,
                    snippetId: 7,
                    text: 'Awesome!!',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('comments', null, {});
    }
};
