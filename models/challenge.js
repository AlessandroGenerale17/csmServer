'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class challenge extends Model {
        static associate(models) {
            this.belongsTo(models.user, {
                through: 'users',
                foreignKey: 'userId'
            });
            this.belongsTo(models.language, {
                through: 'languages',
                foreignKey: 'languageId'
            });
            this.belongsTo(models.difficulty, {
                through: 'difficulties',
                foreignKey: 'difficultyId'
            });
            this.hasMany(models.testcase);
        }
    }
    challenge.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            code: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            languageId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            prompt: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            hiddenPrompt: {
                type: DataTypes.TEXT
            },
            fName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            difficultyId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'challenge'
        }
    );
    return challenge;
};
