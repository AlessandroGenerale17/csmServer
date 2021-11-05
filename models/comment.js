'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class comment extends Model {
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
    comment.init(
        {
            userId: DataTypes.INTEGER,
            snippetId: DataTypes.INTEGER,
            text: DataTypes.TEXT
        },
        {
            sequelize,
            modelName: 'comment'
        }
    );
    return comment;
};
