'use strict';
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/constants');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'users',
            [
                {
                    name: 'testuser',
                    email: 'test@test.com',
                    password: bcrypt.hashSync('test1234', SALT_ROUNDS),
                    imgUrl: 'https://res.cloudinary.com/dpkg9kv62/image/upload/v1636220308/sample.jpg',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'dummy',
                    email: 'a@a.com',
                    password: bcrypt.hashSync('a', SALT_ROUNDS),
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'Alessandro',
                    email: 'a@g.com',
                    password: bcrypt.hashSync('a', SALT_ROUNDS),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
    }
};
