'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'challenges',
            [
                {
                    title: 'Add 2 numbers',
                    description:
                        'Complete the function assigned to perform an addition of two numbers',
                    code: 'ff',
                    userId: 1,
                    languageId: 1,
                    difficultyId: 1,
                    fName: 'add',
                    prompt: 'function add (a, b) {\n\treturn 0;\n}',
                    numArgs: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Subtract 2 numbers',
                    description:
                        'Complete the function assigned to perform a subtractionn of two numbers',
                    code: 'gg',
                    userId: 1,
                    languageId: 1,
                    difficultyId: 1,
                    fName: 'subtract',
                    prompt: `function subtract (a, b) {\n\t return 0;\n}`,
                    numArgs: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        queryInterface.bulkDelete('challenges', null, {});
    }
};
