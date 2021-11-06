'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        static associate(models) {
            this.hasMany(models.snippet);
            this.hasMany(models.like);
            this.hasMany(models.comment);
        }
    }
    user.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            imgUrl: {
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            modelName: 'user'
        }
    );
    return user;
};
