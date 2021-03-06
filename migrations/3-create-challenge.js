'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('challenges', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            code: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            languageId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'languages',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            prompt: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            hiddenPrompt: {
                type: Sequelize.TEXT
            },
            fName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            numArgs: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            difficultyId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'difficulties',
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
        await queryInterface.dropTable('challenges');
    }
};
