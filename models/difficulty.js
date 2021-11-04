'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class difficulty extends Model {
        static associate(models) {}
    }
    difficulty.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            value: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            color: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'difficulty'
        }
    );
    return difficulty;
};
