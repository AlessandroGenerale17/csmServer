'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class question extends Model {
        static associate(models) {
            // define association here
        }
    }
    question.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            prompt: DataTypes.TEXT,
            fName: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'question'
        }
    );
    return question;
};
