'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'questions',
            [
                {
                    title: 'Add 2 numbers',
                    description:
                        'Complete the function assigned to perform an addition of two numbers',
                    fName: 'add',
                    prompt: 'function add (a, b) {\n\treturn 0;\n}',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Subtract 2 numbers',
                    description:
                        'Complete the function assigned to perform a subtractionn of two numbers',
                    fName: 'subtract',
                    prompt: `function subtract (a, b) {\n\t return 0;\n}`,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        queryInterface.bulkDelete('questions', null, {});
    }
};
