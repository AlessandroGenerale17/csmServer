'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class language extends Model {
        static associate(models) {}
    }
    language.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'language'
        }
    );
    return language;
};
