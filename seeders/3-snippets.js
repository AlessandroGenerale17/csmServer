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
                    issue: true,
                    public: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'For loop',
                    description: 'JS implementation for loop',
                    code: 'for (let i = 0; i < N; i++);',
                    userId: 1,
                    languageId: 1,
                    issue: false,
                    public: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'For Loop in JavaScript',
                    description: `Loops can execute a block of code a number of times. The for loop has the following syntax:\ \`for(statement1; statement2; statement3) {\ \t//code block to be executed\ }\``,
                    code: 'for (let i = 0; i < N; i++);',
                    userId: 2,
                    languageId: 1,
                    issue: false,
                    public: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Snippet4',
                    description: 'JS implementation for loop',
                    code: 'for (let i = 0; i < N; i++);',
                    userId: 2,
                    languageId: 1,
                    issue: false,
                    public: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },

                {
                    title: 'Snippet3',
                    description: 'JS implementation for loop',
                    code: 'for (let i = 0; i < N; i++);',
                    userId: 2,
                    languageId: 1,
                    issue: false,
                    public: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Snippet4',
                    description: 'JS implementation for loop',
                    code: 'for (let i = 0; i < N; i++);',
                    userId: 2,
                    languageId: 1,
                    issue: false,
                    public: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Snippet3',
                    description: 'JS implementation for loop',
                    code: 'for (let i = 0; i < N; i++);',
                    userId: 2,
                    languageId: 1,
                    issue: false,
                    public: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Snippet4',
                    description: 'JS implementation for loop',
                    code: 'for (let i = 0; i < N; i++);',
                    userId: 2,
                    languageId: 1,
                    issue: false,
                    public: true,
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
