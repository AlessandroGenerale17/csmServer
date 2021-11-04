'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class testcase extends Model {
        static associate(models) {
            this.belongsTo(models.challenge, {
                through: 'challenges',
                foreignKey: 'challengeId'
            });
        }
    }
    testcase.init(
        {
            args: {
                type: DataTypes.STRING,
                allowNull: false
            },
            solution: {
                type: DataTypes.STRING,
                allowNull: false
            },
            challengeId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'testcase'
        }
    );
    return testcase;
};
