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
                    prompt: 'function add (a, b) {\n  return 0;\n}',
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
                    prompt: `function subtract (a, b) {\n  return 0;\n}`,
                    numArgs: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Two Sum',
                    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.\n\n You may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\n You can return the answer in any order.`,
                    code: 'gg',
                    userId: 1,
                    languageId: 1,
                    difficultyId: 1,
                    fName: 'twoSum',
                    prompt: 'function twoSum(nums, target) {\n  return 0;\n}',
                    numArgs: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Pow(x, n)',
                    description: `Implement \`pow(x, n)\`, which calculates \`x\` raised to the power n (i.e., \`x\`^n).`,
                    code: 'gg',
                    userId: 1,
                    languageId: 1,
                    difficultyId: 2,
                    fName: 'myPow',
                    prompt: 'function myPow(x, n) {\n  return 0;\n}',
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
