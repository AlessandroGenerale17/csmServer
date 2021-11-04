'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class like extends Model {
        static associate(models) {
            this.belongsTo(models.user, {
                through: 'users',
                foreignKey: 'userId'
            });
            this.belongsTo(models.snippet, {
                through: 'snippets',
                foreignKey: 'snippetId'
            });
        }
    }
    like.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            snippetId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'like'
        }
    );
    return like;
};
