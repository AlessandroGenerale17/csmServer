'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('testcases', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            args: {
                type: Sequelize.STRING,
                allowNull: false
            },
            solution: {
                type: Sequelize.STRING,
                allowNull: false
            },
            challengeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'challenges',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('testcases');
    }
};
