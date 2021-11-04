'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class snippet extends Model {
        static associate(models) {
            this.belongsTo(models.user, {
                through: 'users',
                foreignKey: 'userId'
            });
            this.belongsTo(models.language, {
                through: 'languages',
                foreignKey: 'languageId'
            });

            this.hasMany(models.like);
        }
    }
    snippet.init(
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
            public: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            issue: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'snippet'
        }
    );
    return snippet;
};
